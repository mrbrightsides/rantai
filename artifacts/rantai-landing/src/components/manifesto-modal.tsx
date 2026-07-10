import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface ManifestoModalProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    index: '01',
    title: 'We Build in the Open',
    body: `RANTAI was born from a simple belief: the most transformative technology in human history should not be owned by a handful of corporations. Every line of code we write is open-source. Every decision we make is on-chain. Every protocol we design is permissionless by default. We do not build walled gardens — we build public infrastructure for the archipelago and beyond.`,
  },
  {
    index: '02',
    title: 'Decentralization is Not a Feature — It is the Point',
    body: `The centralized internet promised convenience and delivered dependence. We reject the trade. Decentralization means that no single actor — no government, no venture fund, no founding team — holds a kill switch over the systems our communities depend on. We architect for resilience. We design for exit. We build so that the network survives us.`,
  },
  {
    index: '03',
    title: 'Indonesia First, Global Always',
    body: `The archipelago is 17,000 islands, 277 million people, and centuries of navigating complex waters. That legacy of distributed coordination is in our DNA. RANTAI is rooted in the Indonesian soil — Bahasa, Batik, and all — but our protocols speak every language. We solve local problems with tools that scale globally, and we bring global knowledge home.`,
  },
  {
    index: '04',
    title: 'Amanah: Trustlessness Built on Trust',
    body: `The word "amanah" — sacred trust — sits at the center of our name. The paradox of Web3 is this: trustless systems require deeply trustworthy people to build them. We hold ourselves accountable. We ship what we say we will ship. We document, we audit, we disclose. Smart contracts may eliminate the need to trust intermediaries, but they will never eliminate the need for builders with integrity.`,
  },
  {
    index: '05',
    title: 'The Community is the Product',
    body: `We do not build for the community. We build as the community. RANTAI has no employees — only contributors. No hierarchy — only accountable roles. No roadmap handed down from above — only proposals ratified by the people who show up. If you write code, ship documentation, run a node, educate a student, or fund a grant, you are RANTAI. The collective is the only moat that matters.`,
  },
  {
    index: '06',
    title: 'We Play a Long Game',
    body: `Cycles come and go. Bears end. Bulls end. We do not optimize for price — we optimize for protocol. The technology we are building will outlast every market narrative. We measure success in contributors, in deployments, in lives changed, in systems that run for decades without a custodian. We are not here to flip. We are here to finish.`,
  },
];

export function ManifestoModal({ open, onClose }: ManifestoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Remember opener so we can restore focus on close
  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement as HTMLElement;
      setTimeout(() => closeRef.current?.focus(), 100);
    } else {
      openerRef.current?.focus();
      openerRef.current = null;
    }
  }, [open]);

  // Escape to close + focus trap
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter((el) => !el.closest('[aria-hidden="true"]'));

    if (focusable.length === 0) { e.preventDefault(); return; }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="manifesto-title"
            className="fixed inset-0 z-[81] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#070b12] border border-cyan-500/15 rounded-2xl shadow-[0_0_80px_rgba(0,240,255,0.08)] pointer-events-auto overflow-hidden"
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="shrink-0 flex items-start justify-between px-8 pt-8 pb-6 border-b border-white/5">
                <div>
                  <p className="text-xs font-mono text-cyan-500/70 uppercase tracking-[0.2em] mb-2">
                    RANTAI Communities — 2026
                  </p>
                  <h2 id="manifesto-title" className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                    The RANTAI<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                      Manifesto
                    </span>
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all mt-1"
                  aria-label="Close manifesto"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                {sections.map((s) => (
                  <div key={s.index} className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-cyan-500/50 uppercase tracking-[0.2em]">
                        {s.index}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/15 to-transparent" />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-3 flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-500/60 shrink-0 mt-0.5" />
                      {s.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm pl-6">
                      {s.body}
                    </p>
                  </div>
                ))}

                {/* Closing statement */}
                <div className="border-t border-white/5 pt-8 pb-2 text-center">
                  <p className="font-display text-lg font-bold text-white mb-2">
                    Riset. Amanah. Teknologi. Integrasi.
                  </p>
                  <p className="text-xs font-mono text-cyan-500/50 uppercase tracking-[0.25em]">
                    RANTAI — The Chain That Connects Us
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
