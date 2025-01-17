import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = () => (
  <Avatar className="h-8 w-8">
    <AvatarFallback>
      <User className="h-4 w-4" />
    </AvatarFallback>
  </Avatar>
);