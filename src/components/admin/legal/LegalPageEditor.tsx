import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteViewRaw, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface LegalPageEditorProps {
  initialContent: any[];
  onSave: (content: any[]) => void;
}

export function LegalPageEditor({ initialContent, onSave }: LegalPageEditorProps) {
  const editor: BlockNoteEditor = useBlockNote({
    initialContent,
    onChange: (editor) => {
      const saveButton = document.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      if (saveButton) {
        saveButton.click();
      }
    },
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