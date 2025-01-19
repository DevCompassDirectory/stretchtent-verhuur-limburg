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

  // Ensure initialContent is a valid array and each block has the required properties
  const validateBlock = (block: any) => {
    if (!block || typeof block !== 'object') return false;
    if (!block.type || typeof block.type !== 'string') return false;
    if (!Array.isArray(block.content)) return false;
    return true;
  };

  // Validate and clean the content
  const validContent = Array.isArray(initialContent) && initialContent.length > 0
    ? initialContent.filter(validateBlock)
    : defaultContent;

  // If no valid blocks were found, use default content
  const editorContent = validContent.length > 0 ? validContent : defaultContent;

  const editor: BlockNoteEditor = useBlockNote({
    initialContent: editorContent,
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