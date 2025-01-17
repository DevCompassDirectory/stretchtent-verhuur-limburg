import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;