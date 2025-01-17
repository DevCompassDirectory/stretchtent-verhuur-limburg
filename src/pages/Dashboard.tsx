import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;