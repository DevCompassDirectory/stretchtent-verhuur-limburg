import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DynamicFieldsProps {
  schema: Record<string, any>;
}

export const DynamicFields = ({ schema }: DynamicFieldsProps) => {
  const form = useFormContext();

  const renderField = (fieldName: string, fieldSchema: any) => {
    const type = fieldSchema.type;

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={`details.${fieldName}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldSchema.label || fieldName}</FormLabel>
            <FormControl>
              <div>
                {type === "text" && (
                  <Input {...field} value={field.value ?? ""} />
                )}
                {type === "textarea" && (
                  <Textarea {...field} value={field.value ?? ""} />
                )}
                {type === "number" && (
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value ?? ""}
                  />
                )}
                {type === "boolean" && (
                  <div className="pt-2">
                    <Switch
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
                {type === "select" && (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${fieldSchema.label || fieldName}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldSchema.options?.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(schema).map(([fieldName, fieldSchema]) =>
        renderField(fieldName, fieldSchema)
      )}
    </div>
  );
};