import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Welcome</h3>
          <p className="text-muted-foreground">
            This is your admin dashboard. From here you can manage your website content and settings.
          </p>
        </Card>
        {/* Add more dashboard cards here as needed */}
      </div>
    </div>
  );
};

export default Dashboard;