import { useState } from 'react';
import { motion } from 'framer-motion';
import { WalletAuth } from '@/components/wallet-auth';
import { ManifestoModal } from '@/components/manifesto-modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Database, 
  Network, 
  Globe2, 
  Github, 
  Mail, 
  ChevronRight,
  Rocket
} from 'lucide-react';

const products = [
  { name: 'EXPLODA', desc: 'Next-gen block explorer for Substrate & EVM chains.', status: 'live', link: '#' },
  { name: 'BUSI', desc: 'Decentralized IoT sensor network for agricultural telemetry.', status: 'beta', link: '#' },
  { name: 'MODEL PREDI', desc: 'On-chain machine learning inference oracle.', status: 'dev', link: '#' },
  { name: 'ETHIKA', desc: 'Transparent credentialing and SBT issuance platform.', status: 'live', link: '#' },
  { name: 'Nexus', desc: 'Cross-chain bridge aggregator with unified liquidity.', status: 'beta', link: '#' },
  { name: 'Diva', desc: 'Distributed validation architecture for local validators.', status: 'dev', link: '#' },
  { name: 'Learn3', desc: 'Incentivized Web3 education platform for Indonesian devs.', status: 'live', link: '#' },
  { name: 'BlockPedia', desc: 'Open-source decentralized knowledge graph.', status: 'beta', link: '#' },
];

export default function Home() {
  const [manifestoOpen, setManifestoOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#05080f]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Network className="w-5 h-5 text-[#05080f]" />
            </div>
            <span className="font-display font-bold text-lg tracking-wide text-white">
              RANTAI <span className="text-cyan-400 font-normal">Communities</span>
            </span>
          </div>
          <WalletAuth />
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background grid/glows */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px]" />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)',
                backgroundSize: '4rem 4rem'
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Indonesia's Open Innovation Movement
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight">
                  Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Decentralized</span> Future Together
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              >
                We build smart contracts, token economies, IoT integrations, and transparent digital systems. A grassroots community pushing Web3 adoption across the archipelago.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <Button asChild size="lg" className="w-full sm:w-auto font-display text-base group h-12 px-8">
                  <a href="https://showcase.elpeef.com/" target="_blank" rel="noopener noreferrer">
                    Explore Ecosystem
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-display text-base h-12 px-8">
                  <a href="https://github.com/RANTAI-com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Join the Network
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ecosystem Pillars */}
        <section className="py-24 relative border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Ecosystem Pillars</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">The foundation of the RANTAI collective. Research, development, and community working in unison.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: 'RANTAI Dev', icon: Code2, desc: 'Smart contract platform and core infrastructure development. The builder engine.' },
                { title: 'RANTAI Lab', icon: Database, desc: 'Web3, IoT, and Machine Learning incubator. Researching the next frontier.' },
                { title: 'RANTAI Net', icon: Globe2, desc: 'Collaborative network and governance layer. Connecting the Indonesian nodes.' },
              ].map((pillar, i) => (
                <motion.div 
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-[#05080f] border border-white/10 hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <pillar.icon className="w-32 h-32 text-cyan-400" />
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-cyan-950/50 flex items-center justify-center mb-6 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                    <pillar.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Active Initiatives</h2>
                <p className="text-slate-400 max-w-xl">Open-source products and public goods built by the RANTAI community.</p>
              </div>
              <Button asChild variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                <a href="https://github.com/mrbrightsides" target="_blank" rel="noopener noreferrer">
                  View all on GitHub <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <motion.a
                  href={product.link}
                  key={product.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group p-5 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-cyan-950/10 hover:border-cyan-500/40 transition-all flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                    <Badge variant={product.status as any} className="uppercase tracking-wider text-[10px] px-2">
                      {product.status}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm flex-1 mb-6">
                    {product.desc}
                  </p>
                  <div className="flex items-center text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Explore <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 relative bg-gradient-to-b from-transparent to-[#020408]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto bg-cyan-950/50 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                <Rocket className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                An Initiative by ELPEEF
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                RANTAI (Riset Amanah Teknologi dan Integrasi) represents the Indonesian soul within the global Web3 aesthetic. We believe that open innovation, decentralized networks, and trustless systems are the key to unlocking equitable technological advancement in Southeast Asia.
              </p>
              <Button size="lg" className="font-display rounded-full" onClick={() => setManifestoOpen(true)}>
                Read the Manifesto
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#020408] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                <Network className="w-3 h-3 text-[#05080f]" />
              </div>
              <span className="font-display font-bold text-white text-lg">RANTAI</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <a href="https://elpeef.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                <Globe2 className="w-4 h-4" />
                elpeef.com
              </a>
              <a href="mailto:community@rantai.elpeef.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                community@rantai.elpeef.com
              </a>
              <a href="https://github.com/RANTAI-com" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" />
                RANTAI-com
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-slate-600">
            &copy; {new Date().getFullYear()} RANTAI Communities. Built by ELPEEF.
          </div>
        </div>
      </footer>

      <ManifestoModal open={manifestoOpen} onClose={() => setManifestoOpen(false)} />
    </div>
  );
}
