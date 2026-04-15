import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { StickyEnrollCTA } from "./components/StickyEnrollCTA";
import Home from "./pages/Home";
import Enrollment from "./pages/Enrollment";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEnrollments from "./pages/AdminEnrollments";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminCalendar from "./pages/AdminCalendar";
import AdminMentors from "./pages/AdminMentors";
import AdminReviews from "./pages/AdminReviews";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"\\"} component={Home} />
      <Route path={"/enroll"} component={Enrollment} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path="/admin/enrollments" component={AdminEnrollments} />
      <Route path={"/admin/analytics"} component={AdminAnalytics} />
      <Route path={"/admin/calendar"} component={AdminCalendar} />
      <Route path="/admin/mentors" component={AdminMentors} />
      <Route path="/admin/reviews" component={AdminReviews} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
            <StickyEnrollCTA />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
