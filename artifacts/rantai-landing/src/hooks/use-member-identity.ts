import { useEnsName, useEnsAvatar } from 'wagmi';
import { mainnet } from 'wagmi/chains';

/**
 * Resolves ENS name + avatar for a connected address.
 * Falls back gracefully when ENS isn't set — caller should use
 * a deterministic avatar generated from the address.
 */
export function useMemberIdentity(address?: `0x${string}`) {
  const { data: ensName, isLoading: nameLoading } = useEnsName({
    address,
    chainId: mainnet.id,
    query: { enabled: !!address },
  });

  const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    query: { enabled: !!ensName },
  });

  return {
    ensName: ensName ?? null,
    ensAvatar: ensAvatar ?? null,
    isLoading: nameLoading || (!!ensName && avatarLoading),
  };
}

/** Deterministic gradient pair from an Ethereum address — used as avatar fallback. */
export function addressToGradient(address: string): [string, string] {
  const seed = parseInt(address.slice(2, 8), 16);
  const h1 = seed % 360;
  const h2 = (h1 + 140) % 360;
  return [`hsl(${h1},65%,55%)`, `hsl(${h2},65%,55%)`];
}
