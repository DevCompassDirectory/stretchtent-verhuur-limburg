import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
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
    onEditorContentChange: (editor) => {
      // This will update the form's state with the latest content
      onSave(editor.topLevelBlocks);
    },
    // Disable the side menu to prevent the error
    sideMenu: false,
  });

  return (
    <div className="min-h-[500px] border rounded-md">
      <BlockNoteView
        editor={editor}
        theme="light"
      />
    </div>
  );
}