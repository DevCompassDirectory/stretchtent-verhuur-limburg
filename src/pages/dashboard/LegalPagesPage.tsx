import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LegalPageEditDialog } from "@/components/admin/legal/LegalPageEditDialog";
import { ContentSection } from "@/components/admin/ContentSection";
import { useForm } from "react-hook-form";

export type LegalPage = {
  id: string;
  type: 'privacy' | 'terms' | 'rental';
  title: string;
  content: any[];
  updated_at: string;
};

const LegalPagesPage = () => {
  const [selectedPage, setSelectedPage] = useState<LegalPage | null>(null);
  const form = useForm();

  const { data: pages, isLoading } = useQuery({
    queryKey: ["legal-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_pages")
        .select("*")
        .order("type");

      if (error) throw error;
      return data as LegalPage[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <ContentSection 
      title="Legal Pages" 
      fields={[]} 
      form={form}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages?.map((page) => (
            <TableRow key={page.id}>
              <TableCell>{page.title}</TableCell>
              <TableCell className="capitalize">{page.type}</TableCell>
              <TableCell>
                {new Date(page.updated_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPage(page)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <LegalPageEditDialog
        page={selectedPage}
        open={!!selectedPage}
        onOpenChange={(open) => !open && setSelectedPage(null)}
      />
    </ContentSection>
  );
};

export default LegalPagesPage;