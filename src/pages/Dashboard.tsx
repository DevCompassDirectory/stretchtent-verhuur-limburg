import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="container mt-20 grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;