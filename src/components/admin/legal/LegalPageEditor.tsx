import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteViewRaw, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface LegalPageEditorProps {
  initialContent: any[];
  onSave: (content: any[]) => void;
}

export function LegalPageEditor({ initialContent, onSave }: LegalPageEditorProps) {
  // Ensure we always have at least one empty paragraph block
  const defaultContent = [
    {
      type: "paragraph",
      content: [],
    },
  ];

  const editor: BlockNoteEditor = useBlockNote({
    initialContent: Array.isArray(initialContent) && initialContent.length > 0 
      ? initialContent 
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