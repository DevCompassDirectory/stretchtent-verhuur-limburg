import { ProjectTable } from "@/components/admin/projects/ProjectTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProjectForm } from "@/components/admin/projects/ProjectForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ProjectsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projecten</h1>
          <p className="text-muted-foreground">
            Beheer hier alle projecten die worden weergegeven op de website.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2" />
          Project Toevoegen
        </Button>
      </div>

      <ProjectTable onEdit={setEditingProject} />

      <Dialog open={isFormOpen || !!editingProject} onOpenChange={(open) => {
        setIsFormOpen(open);
        if (!open) setEditingProject(null);
      }}>
        <DialogContent className="max-w-2xl">
          <ProjectForm 
            projectId={editingProject} 
            onSuccess={() => {
              setIsFormOpen(false);
              setEditingProject(null);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}