import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "./pages/Index";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Stretchtenten from "./pages/Stretchtenten";
import TentDetail from "./pages/TentDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Pages from "./pages/admin/Pages";
import CreatePage from "./pages/admin/CreatePage";
import EditPage from "./pages/admin/EditPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
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
                  <Route index element={<div className="container py-6">Welcome to Dashboard</div>} />
                  <Route path="pages" element={<Pages />} />
                  <Route path="pages/create" element={<CreatePage />} />
                  <Route path="pages/:id/edit" element={<EditPage />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/algemene-voorwaarden" element={<Terms />} />
                <Route path="/stretchtenten" element={<Stretchtenten />} />
                <Route path="/stretchtenten/:id" element={<TentDetail />} />
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