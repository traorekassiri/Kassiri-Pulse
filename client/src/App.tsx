import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import { About, Legal, Privacy } from "./pages/StaticPages";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/article/:category/:slug" component={ArticleDetail} />
      <Route path="/category/:category" component={CategoryPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/a-propos" component={About} />
      <Route path="/mentions-legales" component={Legal} />
      <Route path="/confidentialite" component={Privacy} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
