import { useHomeContent } from "@/hooks/use-home-content";
import { HomePageForm } from "@/components/admin/HomePageForm";

const HomePage = () => {
  const { data: content, isLoading, error } = useHomeContent();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Home Page Content</h1>
        <p className="text-muted-foreground">
          Manage the content displayed on the home page.
        </p>
      </div>
      <HomePageForm initialContent={content} />
    </div>
  );
};

export default HomePage;