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
		if (!content || !Array.isArray(content)) {
			console.warn('Invalid content format, using default content');
			return defaultContent;
		}

		try {
			return content.map((block) => {
				// Ensure block is an object
				if (typeof block !== 'object' || !block) {
					return defaultContent[0];
				}

				// Validate and process block content
				const processedContent = Array.isArray(block.content)
					? block.content.map((item: any) => ({
							type: 'text',
							text:
								typeof item?.text === 'string' ? item.text : '',
							styles:
								typeof item?.styles === 'object'
									? item.styles
									: {},
					  }))
					: [
							{
								type: 'text',
								text: '',
								styles: {},
							},
					  ];

				// Create a valid block structure
				return {
					type:
						typeof block.type === 'string'
							? block.type
							: 'paragraph',
					props: {
						textAlignment: block.props?.textAlignment || 'left',
						backgroundColor:
							block.props?.backgroundColor || 'default',
						textColor: block.props?.textColor || 'default',
						level:
							typeof block.props?.level === 'number'
								? block.props.level
								: undefined,
					},
					content: processedContent,
					children: Array.isArray(block.children)
						? block.children
						: [],
				};
			});
		} catch (error) {
			console.error('Error processing content:', error);
			return defaultContent;
		}
	};

	// Process initial content before creating the editor
	const validContent =
		initialContent &&
		Array.isArray(initialContent) &&
		initialContent.length > 0
			? processContent(initialContent)
			: defaultContent;

	const editor = useCreateBlockNote({
		initialContent: validContent,
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
