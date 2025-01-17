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
                />
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <Home />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <Projects />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <Contact />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/privacy" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <Privacy />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/algemene-voorwaarden" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <Terms />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/stretchtenten" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <Stretchtenten />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/stretchtenten/:id" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <TentDetail />
                    </ProtectedRoute>
                  } 
                />
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