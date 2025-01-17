import { PageForm } from "@/components/admin/PageForm";

export default function CreatePage() {
  return (
    <div className="container max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Page</h1>
        <p className="text-muted-foreground">Add a new page to your website</p>
      </div>
      <PageForm />
    </div>
  );
}