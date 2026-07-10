import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { WagmiProvider, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { setBaseUrl } from "@workspace/api-client-react";

import Home from "@/pages/home";

// Point API calls at the deployed backend when VITE_API_URL is set.
// Falls back to same-origin (Replit dev proxy) when the var is absent.
if (import.meta.env.VITE_API_URL) {
  setBaseUrl(import.meta.env.VITE_API_URL);
}

const queryClient = new QueryClient();

const wagmiConfig = getDefaultConfig({
  appName: "RANTAI Communities",
  projectId: "rantai-communities-placeholder",
  chains: [mainnet],
  // Use Cloudflare's public Ethereum RPC — allows browser CORS requests.
  // eth.merkle.io (wagmi default) blocks cross-origin requests from Vercel.
  transports: { [mainnet.id]: http("https://cloudflare-eth.com") },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="*">
        <div className="flex h-screen items-center justify-center text-cyan-400 font-display text-2xl">
          404 - Not Found
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#00ffff",
            accentColorForeground: "#05080f",
          })}
        >
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="bg-noise min-h-screen selection:bg-cyan-500/30 selection:text-cyan-50 text-foreground dark">
              <Router />
            </div>
          </WouterRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
