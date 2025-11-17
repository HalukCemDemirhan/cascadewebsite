import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import White from "@/pages/white";
import Investors from "@/pages/investors";
import NotFound from "@/pages/not-found";

const configuredBase =
  import.meta.env.VITE_PUBLIC_BASE_PATH ?? import.meta.env.BASE_URL ?? "/";
const basePath =
  configuredBase === "/" ? "" : configuredBase.replace(/\/$/, "");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <WouterRouter base={basePath}>
          <Switch>
            <Route path="/" component={White} />
            <Route path="/investors" component={Investors} />
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
