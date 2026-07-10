import { useEffect, useRef, useState } from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createSiweMessage } from 'viem/siwe';
import {
  useGetSiweNonce,
  useVerifySiweSignature,
  useGetSiweSession,
  useSiweLogout,
  getGetSiweSessionQueryKey,
  getGetSiweNonceQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogOut, ChevronDown } from 'lucide-react';
import { MemberPanel } from '@/components/member-panel';

export function WalletAuth() {
  const { address, chainId, isConnected, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const queryClient = useQueryClient();
  const [panelOpen, setPanelOpen] = useState(false);

  const { data: session } = useGetSiweSession({
    query: { queryKey: getGetSiweSessionQueryKey() }
  });

  const { refetch: getNonce } = useGetSiweNonce({
    query: { enabled: false, queryKey: getGetSiweNonceQueryKey() }
  });

  const verifySignature = useVerifySiweSignature();
  const logout = useSiweLogout();

  const hasPrompted = useRef(false);

  // Close panel automatically when the user logs out or session expires
  useEffect(() => {
    if (!session?.address) {
      setPanelOpen(false);
    }
  }, [session?.address]);

  // wagmi v2: chain is undefined when connected to a network not in the configured chains list
  const isUnsupportedChain = isConnected && !chain;

  useEffect(() => {
    async function signSiwe() {
      if (isConnected && address && chainId && !isUnsupportedChain && !session?.address && !hasPrompted.current) {
        hasPrompted.current = true;
        try {
          const nonceRes = await getNonce();
          const nonce = nonceRes.data?.nonce;
          if (!nonce) throw new Error('No nonce');

          const message = createSiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to RANTAI Communities.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce,
          });

          const signature = await signMessageAsync({ message });

          await verifySignature.mutateAsync({ data: { message, signature } });

          queryClient.invalidateQueries({ queryKey: getGetSiweSessionQueryKey() });
          // Don't reset hasPrompted here — keep it true until session loads.
          // Resetting here causes a re-trigger loop because session?.address is
          // still undefined while the query refetches.
        } catch (error) {
          console.error('SIWE signature failed', error);
          hasPrompted.current = false; // only reset on failure so user can retry
          disconnect();
        }
      }
    }
    signSiwe();
  }, [isConnected, address, chainId, session, getNonce, signMessageAsync, verifySignature, queryClient, disconnect]);

  const handleLogout = async () => {
    hasPrompted.current = false; // allow sign-in again after reconnect
    await logout.mutateAsync();
    queryClient.invalidateQueries({ queryKey: getGetSiweSessionQueryKey() });
    disconnect();
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!ready) {
          return <div className="w-[140px] h-9 bg-white/5 animate-pulse rounded-md" aria-hidden="true" />;
        }

        if (session?.address) {
          const sessionAddress = session.address as `0x${string}`;
          return (
            <>
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Clickable address chip → opens member panel */}
                <button
                  onClick={() => setPanelOpen(true)}
                  className="group flex items-center gap-1.5 text-xs sm:text-sm font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-md border border-cyan-500/20 shadow-[0_0_10px_rgba(0,240,255,0.05)] backdrop-blur-sm hover:bg-cyan-950/70 hover:border-cyan-500/40 hover:shadow-[0_0_18px_rgba(0,240,255,0.12)] transition-all"
                  title="View member profile"
                  data-testid="button-member-profile"
                >
                  {sessionAddress.slice(0, 6)}...{sessionAddress.slice(-4)}
                  <ChevronDown className="w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity" />
                </button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLogout}
                  className="h-9 w-9 border-cyan-800/50 text-cyan-500 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/50"
                  title="Disconnect Wallet"
                  data-testid="button-disconnect"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

              <MemberPanel
                isOpen={panelOpen}
                onClose={() => setPanelOpen(false)}
                address={sessionAddress}
                chainName={chain?.name}
              />
            </>
          );
        }

        if (connected) {
          if (chain.unsupported) {
            return (
              <Button onClick={openChainModal} variant="destructive" size="sm" className="font-display">
                Wrong network
              </Button>
            );
          }
          return (
            <Button disabled size="sm" className="bg-cyan-950 text-cyan-400 border border-cyan-500/50 shadow-none">
              <span className="animate-pulse">Sign message...</span>
            </Button>
          );
        }

        return (
          <Button
            onClick={openConnectModal}
            size="sm"
            className="font-display text-sm tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
            data-testid="button-connect-wallet"
          >
            Connect Wallet
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}
