import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Stretchtenten from "@/pages/Stretchtenten";
import TentDetail from "@/pages/TentDetail";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import HomePage from "@/pages/dashboard/HomePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><Index /></AuthProvider>,
  },
  {
    path: "/contact",
    element: <AuthProvider><Contact /></AuthProvider>,
  },
  {
    path: "/projects",
    element: <AuthProvider><Projects /></AuthProvider>,
  },
  {
    path: "/projects/:id",
    element: <AuthProvider><ProjectDetail /></AuthProvider>,
  },
  {
    path: "/stretchtenten",
    element: <AuthProvider><Stretchtenten /></AuthProvider>,
  },
  {
    path: "/stretchtenten/:id",
    element: <AuthProvider><TentDetail /></AuthProvider>,
  },
  {
    path: "/privacy",
    element: <AuthProvider><Privacy /></AuthProvider>,
  },
  {
    path: "/terms",
    element: <AuthProvider><Terms /></AuthProvider>,
  },
  {
    path: "/auth",
    element: <AuthProvider><Auth /></AuthProvider>,
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <div>Welcome to the dashboard</div>,
      },
      {
        path: "homepage",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;