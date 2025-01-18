import { useHomeContent } from "@/hooks/use-home-content";
import { HomePageForm } from "@/components/admin/HomePageForm";

export default function HomePage() {
  const { data: content, isLoading, error } = useHomeContent();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !content) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Homepage Content</h2>
        <p className="text-muted-foreground">
          Manage your homepage content and SEO settings.
        </p>
      </div>
      <HomePageForm initialData={content} />
    </div>
  );
}