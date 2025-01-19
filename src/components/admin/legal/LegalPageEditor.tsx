import { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/style.css';
import '@blocknote/mantine/style.css';

interface LegalPageEditorProps {
	initialContent: any[];
	onSave: (content: any[]) => void;
}

export function LegalPageEditor({
	initialContent,
	onSave,
}: LegalPageEditorProps) {
	// Default content for when initialContent is invalid or empty
	const defaultContent: PartialBlock[] = [
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: '',
					styles: {},
				},
			],
		},
	];

	// Transform and validate the content
	const processContent = (content: any[]): PartialBlock[] => {
		if (!Array.isArray(content)) return defaultContent;

		try {
			return content.map((block) => {
				// Ensure block is an object
				if (typeof block !== 'object' || !block) {
					return defaultContent[0];
				}

				return {
					type: 'paragraph',
					content: Array.isArray(block.content)
						? block.content.map((item) => ({
								type: 'text',
								text:
									typeof item?.text === 'string'
										? item.text
										: '',
								styles: {},
						  }))
						: [
								{
									type: 'text',
									text:
										typeof block.content === 'string'
											? block.content
											: '',
									styles: {},
								},
						  ],
				};
			});
		} catch (error) {
			console.error('Error processing content:', error);
			return defaultContent;
		}
	};

	const editor = useCreateBlockNote({
		initialContent:
			initialContent && initialContent.length > 0
				? processContent(initialContent)
				: defaultContent,
		domAttributes: {
			editor: {
				class: 'min-h-[500px] p-4',
			},
		},
	});

	// Save content when it changes
	const handleChange = () => {
		const blocks = editor.document;
		onSave(blocks);
	};

	return (
		<div className='border rounded-md bg-background'>
			<BlockNoteView
				editor={editor}
				theme='light'
				onChange={handleChange}
			/>
		</div>
	);
}
