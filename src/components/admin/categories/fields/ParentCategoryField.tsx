import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CategoryFormValues } from "../schema";

interface ParentCategoryFieldProps {
  form: UseFormReturn<CategoryFormValues>;
  categories?: any[];
}

export const ParentCategoryField = ({ form, categories }: ParentCategoryFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="parent_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Parent Category</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a parent category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="null">None</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};