import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageComponent } from "../types";

interface ComponentCardProps {
  component: PageComponent;
  onEdit: (component: PageComponent) => void;
}

export function ComponentCard({ component, onEdit }: ComponentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base capitalize">{component.component_type}</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(component)}
          >
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {component.component_type === "text" && (
          <div className="space-y-2">
            <p className="font-medium">{component.content.title}</p>
            <p className="text-muted-foreground">{component.content.content}</p>
          </div>
        )}
        {component.component_type === "hero" && (
          <div className="space-y-2">
            <p className="font-medium">{component.content.heading}</p>
            <p className="text-muted-foreground">{component.content.subheading}</p>
            {component.content.buttonText && (
              <p className="text-sm">Button: {component.content.buttonText}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}