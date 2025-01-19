import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Huurvoorwaarden from "./pages/Huurvoorwaarden";
import Stretchtenten from "./pages/Stretchtenten";
import TentDetail from "./pages/TentDetail";
import Toebehoren from "./pages/Toebehoren";
import ToebehorenDetail from "./pages/ToebehorenDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/dashboard/HomePage";
import MediaPage from "./pages/dashboard/MediaPage";
import ProjectsPage from "./pages/dashboard/ProjectsPage";
import StretchTentsPage from "./pages/dashboard/StretchTentsPage";
import AccessoriesPage from "./pages/dashboard/AccessoriesPage";
import FooterPage from "./pages/dashboard/FooterPage";
import LegalPagesPage from "./pages/dashboard/LegalPagesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<div>Welcome to Dashboard</div>} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="media" element={<MediaPage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                  <Route path="stretchtents" element={<StretchTentsPage />} />
                  <Route path="accessories" element={<AccessoriesPage />} />
                  <Route path="footer" element={<FooterPage />} />
                  <Route path="legal" element={<LegalPagesPage />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/algemene-voorwaarden" element={<Terms />} />
                <Route path="/huurvoorwaarden" element={<Huurvoorwaarden />} />
                <Route path="/stretchtenten" element={<Stretchtenten />} />
                <Route path="/stretchtenten/:id" element={<TentDetail />} />
                <Route path="/toebehoren" element={<Toebehoren />} />
                <Route path="/toebehoren/:slug" element={<ToebehorenDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;