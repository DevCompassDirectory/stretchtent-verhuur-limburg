import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageComponent } from "../types";

interface AddComponentButtonProps {
  onAdd: (type: PageComponent["component_type"]) => void;
}

export function AddComponentButton({ onAdd }: AddComponentButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Component
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onAdd("text")}>
          Text
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("hero")}>
          Hero
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("image")}>
          Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("gallery")}>
          Gallery
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("cta")}>
          CTA
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("features")}>
          Features
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdd("testimonials")}>
          Testimonials
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}