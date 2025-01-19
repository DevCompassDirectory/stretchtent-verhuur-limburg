import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteViewRaw, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface LegalPageEditorProps {
  initialContent: any[];
  onSave: (content: any[]) => void;
}

// Define the PartialBlock type as per BlockNote documentation
type PartialBlock = {
  id?: string;
  type?: string;
  props?: Partial<Record<string, any>>;
  content?: string | Array<{ type: string; text: string; }>;
  children?: PartialBlock[];
};

export function LegalPageEditor({ initialContent, onSave }: LegalPageEditorProps) {
  // Default content for when initialContent is invalid or empty
  const defaultContent: PartialBlock[] = [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "",
        },
      ],
    },
  ];

  // Validate if a block matches the PartialBlock structure
  const validateBlock = (block: any): block is PartialBlock => {
    if (!block || typeof block !== 'object') return false;
    if (block.type && typeof block.type !== 'string') return false;
    if (block.content && !Array.isArray(block.content) && typeof block.content !== 'string') return false;
    if (block.children && !Array.isArray(block.children)) return false;
    return true;
  };

  // Transform the content to ensure it matches PartialBlock structure
  const transformContent = (content: any[]): PartialBlock[] => {
    try {
      return content.filter(validateBlock).map(block => ({
        ...block,
        content: Array.isArray(block.content) ? block.content : [{ type: "text", text: String(block.content || "") }],
      }));
    } catch (error) {
      console.error("Error transforming content:", error);
      return defaultContent;
    }
  };

  // Process the initial content
  const processedContent = Array.isArray(initialContent) && initialContent.length > 0
    ? transformContent(initialContent)
    : defaultContent;

  const editor: BlockNoteEditor = useBlockNote({
    initialContent: processedContent,
  });

  return (
    <form
      id="legal-page-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(editor.topLevelBlocks);
      }}
    >
      <BlockNoteViewRaw
        editor={editor}
        theme="light"
        className="min-h-[500px] border rounded-md"
      />
    </form>
  );
}