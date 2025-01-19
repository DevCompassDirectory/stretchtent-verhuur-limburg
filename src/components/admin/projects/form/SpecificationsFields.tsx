import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "../ProjectForm";

interface SpecificationsFieldsProps {
  form: UseFormReturn<ProjectFormValues>;
}

export function SpecificationsFields({ form }: SpecificationsFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Specificaties</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="specs.tentSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tent Afmeting</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specs.capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capaciteit</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specs.setup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Setup</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specs.location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locatie</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}