import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteViewRaw, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface LegalPageEditorProps {
  initialContent: any[];
  onSave: (content: any[]) => void;
}

export function LegalPageEditor({ initialContent, onSave }: LegalPageEditorProps) {
  // Default content for when initialContent is invalid or empty
  const defaultContent = [
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

  // Validate initialContent and ensure it's a valid array with at least one block
  const validContent = Array.isArray(initialContent) && initialContent.length > 0 
    ? initialContent.map(block => ({
        ...block,
        content: Array.isArray(block.content) ? block.content : [],
      }))
    : defaultContent;

  const editor: BlockNoteEditor = useBlockNote({
    initialContent: validContent,
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