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
    element: <Index />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/projects/:id",
    element: <ProjectDetail />,
  },
  {
    path: "/stretchtenten",
    element: <Stretchtenten />,
  },
  {
    path: "/stretchtenten/:id",
    element: <TentDetail />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
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

const AppWithProviders = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

function App() {
  return <AppWithProviders />;
}

export default App;