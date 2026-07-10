import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Shield, Zap, Crown } from 'lucide-react';
import { useMemberIdentity, addressToGradient } from '@/hooks/use-member-identity';

interface MemberPanelProps {
  isOpen: boolean;
  onClose: () => void;
  address: `0x${string}`;
  chainName?: string;
}

const PANEL_TITLE_ID = 'member-panel-title';

/** Special roles keyed by lowercase address */
const MEMBER_ROLES: Record<string, { label: string; color: string; icon: 'crown' | 'shield' }> = {
  '0x17a1e4875c125ad6e89388d9f042a361499495da': {
    label: 'RANTAI LEAD',
    color: 'amber',
    icon: 'crown',
  },
};

export function MemberPanel({ isOpen, onClose, address, chainName }: MemberPanelProps) {
  const { ensName, ensAvatar, isLoading } = useMemberIdentity(address);
  const [copied, setCopied] = useState(false);

  const panelRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const role = MEMBER_ROLES[address.toLowerCase()] ?? { label: 'RANTAI MEMBER', color: 'cyan', icon: 'shield' as const };

  // Store the element that triggered open; restore focus on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Defer focus into panel until after the spring animation starts
      const t = setTimeout(() => panelRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    previousFocusRef.current?.focus();
    return undefined;
  }, [isOpen]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute('disabled'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [color1, color2] = addressToGradient(address);
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="member-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#05080f]/70 backdrop-blur-sm"
          />

          {/* Slide-in panel */}
          <motion.aside
            key="member-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={PANEL_TITLE_ID}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-screen w-full max-w-sm z-[70] flex flex-col bg-[#070b12] border-l border-cyan-500/10 shadow-[-20px_0_60px_rgba(0,240,255,0.06)] outline-none"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(0,240,255,0.9)]" aria-hidden="true" />
                <span
                  id={PANEL_TITLE_ID}
                  className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.2em]"
                >
                  Member Profile
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close member profile panel"
                className="p-1.5 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/5 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Identity block — horizontal layout to save vertical space */}
            <div className="px-6 py-5 flex items-center gap-4 border-b border-white/5">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`w-16 h-16 rounded-2xl overflow-hidden ring-2 ${
                    role.color === 'amber'
                      ? 'ring-amber-500/30 shadow-[0_0_24px_rgba(251,191,36,0.15)]'
                      : 'ring-cyan-500/20 shadow-[0_0_24px_rgba(0,240,255,0.12)]'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
                >
                  {ensAvatar ? (
                    <img
                      src={ensAvatar}
                      alt={ensName ?? shortAddress}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-lg font-display font-bold text-white/80 select-none">
                        {address.slice(2, 4).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#070b12] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </div>
              </div>

              {/* Name + role badge */}
              <div className="min-w-0 flex flex-col gap-1.5">
                {isLoading ? (
                  <div className="w-28 h-5 bg-white/5 animate-pulse rounded" />
                ) : (
                  <p className="font-display font-semibold text-base text-white leading-snug truncate">
                    {ensName ?? shortAddress}
                  </p>
                )}
                {ensName && (
                  <p className="text-[11px] font-mono text-white/30 truncate">{shortAddress}</p>
                )}
                {/* Role badge */}
                <div
                  className={`self-start flex items-center gap-1.5 rounded-full px-2.5 py-1 border ${
                    role.color === 'amber'
                      ? 'bg-amber-950/50 border-amber-500/30'
                      : 'bg-cyan-950/40 border-cyan-500/20'
                  }`}
                >
                  {role.icon === 'crown'
                    ? <Crown className={`w-3 h-3 ${role.color === 'amber' ? 'text-amber-400' : 'text-cyan-400'}`} />
                    : <Shield className="w-3 h-3 text-cyan-400" />
                  }
                  <span className={`text-[10px] font-mono tracking-[0.12em] ${role.color === 'amber' ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {role.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Details — cards stretch on tall screens; overflow-y-auto kicks in on short ones */}
            <div className="flex flex-col flex-1 gap-3 px-6 py-4 min-h-0 overflow-y-auto">
              {/* Wallet address card */}
              <div className="flex-1 flex flex-col justify-center bg-white/[0.025] border border-white/[0.06] rounded-xl px-4 py-3 hover:border-cyan-500/15 transition-colors">
                <p className="text-xs text-white/30 mb-2.5 uppercase tracking-widest">Wallet Address</p>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-xs font-mono text-white/60 break-all leading-relaxed">
                    {address.slice(0, 22)}…{address.slice(-6)}
                  </code>
                  <button
                    onClick={handleCopy}
                    title={copied ? 'Copied!' : 'Copy address'}
                    className="shrink-0 p-2 rounded-lg bg-white/5 hover:bg-cyan-950/60 text-white/30 hover:text-cyan-400 transition-all"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {/* Full address on second line */}
                <code className="text-[11px] font-mono text-white/25 break-all mt-1.5 leading-relaxed">
                  {address}
                </code>
              </div>

              {/* Network */}
              <div className="flex-1 flex flex-col justify-center bg-white/[0.025] border border-white/[0.06] rounded-xl px-4 py-3">
                <p className="text-xs text-white/30 mb-2 uppercase tracking-widest">Network</p>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                  <span className="text-sm text-white/70 font-display">{chainName ?? 'Ethereum Mainnet'}</span>
                </div>
              </div>

              {/* Community access */}
              <div className="flex-1 flex flex-col justify-center bg-white/[0.025] border border-white/[0.06] rounded-xl px-4 py-3">
                <p className="text-xs text-white/30 mb-3 uppercase tracking-widest">Community Access</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Open Source', color: 'cyan' },
                    { label: 'Dev Network', color: 'violet' },
                    { label: 'RANTAI Lab', color: 'teal' },
                  ].map(({ label, color }) => (
                    <span
                      key={label}
                      className={`
                        inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full
                        ${color === 'cyan' ? 'bg-cyan-950/50 border border-cyan-500/20 text-cyan-400' : ''}
                        ${color === 'violet' ? 'bg-violet-950/50 border border-violet-500/20 text-violet-400' : ''}
                        ${color === 'teal' ? 'bg-teal-950/50 border border-teal-500/20 text-teal-400' : ''}
                      `}
                    >
                      <Zap className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Etherscan link */}
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/25 hover:text-cyan-400/70 transition-colors py-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on Etherscan
              </a>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 shrink-0">
              <p className="text-xs text-white/20 text-center font-mono tracking-wider">
                RANTAI Communities · Web3 Open Innovation
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
