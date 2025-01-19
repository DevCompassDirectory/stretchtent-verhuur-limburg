import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteViewRaw, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface LegalPageEditorProps {
  initialContent: any[];
  onSave: (content: any[]) => void;
}

export function LegalPageEditor({ initialContent, onSave }: LegalPageEditorProps) {
  // Default content for when initialContent is invalid or empty
  const defaultContent: PartialBlock[] = [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "",
          styles: {}
        },
      ],
    },
  ];

  // Transform and validate the content
  const processContent = (content: any[]): PartialBlock[] => {
    if (!Array.isArray(content)) return defaultContent;

    try {
      return content.map(block => ({
        type: "paragraph",
        content: Array.isArray(block.content) 
          ? block.content.map(item => ({
              type: "text",
              text: String(item.text || ""),
              styles: {} // Add empty styles object as required by BlockNote
            }))
          : [{ 
              type: "text", 
              text: String(block.content || ""),
              styles: {} // Add empty styles object as required by BlockNote
            }],
      }));
    } catch (error) {
      console.error("Error processing content:", error);
      return defaultContent;
    }
  };

  const editor: BlockNoteEditor = useBlockNote({
    initialContent: initialContent && initialContent.length > 0 
      ? processContent(initialContent)
      : defaultContent,
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