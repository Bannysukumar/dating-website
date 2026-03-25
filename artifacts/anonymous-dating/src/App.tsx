import { Suspense, lazy, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/store/use-app-store";

// Eagerly loaded (critical path)
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

// Lazy loaded pages
const Matching = lazy(() => import("@/pages/Matching"));
const Chat = lazy(() => import("@/pages/Chat"));
const About = lazy(() => import("@/pages/About"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Profile = lazy(() => import("@/pages/Profile"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
// SEO Landing Pages
const RandomVideoChat = lazy(() => import("@/pages/RandomVideoChat"));
const AnonymousChat = lazy(() => import("@/pages/AnonymousChat"));
const ChatWithStrangers = lazy(() => import("@/pages/ChatWithStrangers"));
const FreeOnlineDating = lazy(() => import("@/pages/FreeOnlineDating"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function ThemeInit() {
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/matching" component={Matching} />
        <Route path="/chat" component={Chat} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/profile" component={Profile} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        {/* SEO Landing Pages */}
        <Route path="/random-video-chat" component={RandomVideoChat} />
        <Route path="/anonymous-chat" component={AnonymousChat} />
        <Route path="/chat-with-strangers" component={ChatWithStrangers} />
        <Route path="/free-online-dating-no-signup" component={FreeOnlineDating} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ThemeInit />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
