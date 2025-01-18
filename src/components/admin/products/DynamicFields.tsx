import { Input } from "@/components/ui/input";
import type { FormField } from "@/types/product";

interface DynamicFieldsProps {
  fields: FormField[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
}

export const DynamicFields = ({ fields, values, onChange }: DynamicFieldsProps) => {
  const handleChange = (name: string, value: any) => {
    onChange({ ...values, [name]: value });
  };

  const renderField = (field: FormField) => {
    if (field.type === "object" && field.fields) {
      return (
        <div key={field.name} className="space-y-4">
          <h4 className="font-medium">{field.label}</h4>
          <div className="space-y-4">
            {field.fields.map((subField) => renderField(subField))}
          </div>
        </div>
      );
    }

    return (
      <div key={field.name} className="space-y-2">
        <label className="text-sm font-medium">{field.label}</label>
        <Input
          value={values[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          required={field.required}
          type={field.type === "number" ? "number" : "text"}
        />
      </div>
    );
  };

  return <div className="space-y-6">{fields.map(renderField)}</div>;
};