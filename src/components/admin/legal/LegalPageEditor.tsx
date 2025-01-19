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
      props: {
        textAlignment: "left",
        backgroundColor: "default",
        textColor: "default"
      },
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
      return content.map(block => {
        // Ensure block is an object
        if (typeof block !== 'object' || !block) {
          return defaultContent[0];
        }

        return {
          type: "paragraph",
          props: {
            textAlignment: "left",
            backgroundColor: "default",
            textColor: "default"
          },
          content: Array.isArray(block.content) 
            ? block.content.map(item => ({
                type: "text",
                text: typeof item?.text === 'string' ? item.text : '',
                styles: {}
              }))
            : [{ 
                type: "text", 
                text: typeof block.content === 'string' ? block.content : '',
                styles: {}
              }],
        };
      });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event propagation
    onSave(editor.topLevelBlocks);
    return false; // Ensure no default form behavior
  };

  return (
    <form
      id="legal-page-form"
      onSubmit={handleSubmit}
    >
      <BlockNoteViewRaw
        editor={editor}
        theme="light"
        className="min-h-[500px] border rounded-md"
      />
    </form>
  );
}