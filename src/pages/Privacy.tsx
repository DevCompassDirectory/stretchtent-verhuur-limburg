import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import '@/styles/legal-content.css';

interface BlockContent {
	type: string;
	text?: string;
	styles?: {
		bold?: boolean;
		italic?: boolean;
		underline?: boolean;
		strike?: boolean;
	};
}

interface Block {
	id: string;
	type: string;
	props: {
		level?: number;
		textColor?: string;
		textAlignment?: string;
		backgroundColor?: string;
	};
	content: BlockContent[];
	children: Block[];
}

interface LegalPage {
	id: string;
	type: 'privacy' | 'terms' | 'rental';
	title: string;
	content: Block[];
	created_at: string;
	updated_at: string;
}

const convertBlockToHtml = (block: Block): string => {
	if (!block || typeof block !== 'object') {
		console.warn('Invalid block received:', block);
		return '';
	}

	// Convert content array to text with styles
	const contentHtml = Array.isArray(block.content)
		? block.content
				.map((content) => {
					let text = content?.text || '';
					if (content?.styles) {
						if (content.styles.bold)
							text = `<strong>${text}</strong>`;
						if (content.styles.italic) text = `<em>${text}</em>`;
						if (content.styles.underline) text = `<u>${text}</u>`;
						if (content.styles.strike) text = `<s>${text}</s>`;
					}
					return text;
				})
				.join('')
		: '';

	// Ensure props exists
	const props = block.props || {};

	// Wrap content based on block type
	switch (block.type) {
		case 'heading':
			const level = props.level || 1;
			return `<h${level}>${contentHtml}</h${level}>`;
		case 'paragraph':
			return `<p>${contentHtml}</p>`;
		case 'bulletListItem':
			return `<li>${contentHtml}</li>`;
		case 'numberedListItem':
			return `<li>${contentHtml}</li>`;
		default:
			return contentHtml;
	}
};

const wrapListItems = (html: string): string => {
	// Wrap consecutive bulletListItems in <ul>
	html = html.replace(
		/(<li>(?:(?!<li>).)*?<\/li>(?:\s*<li>(?:(?!<li>).)*?<\/li>)*)/g,
		'<ul>$1</ul>'
	);

	// Wrap consecutive numberedListItems in <ol>
	html = html.replace(
		/(<li>(?:(?!<li>).)*?<\/li>(?:\s*<li>(?:(?!<li>).)*?<\/li>)*)/g,
		'<ol>$1</ol>'
	);

	return html;
};

const Privacy = () => {
	const { data: page, isLoading } = useQuery({
		queryKey: ['privacy-page'],
		queryFn: async (): Promise<LegalPage> => {
			const { data, error } = await supabase
				.from('legal_pages')
				.select('*')
				.eq('id', '2026d784-a1d9-4098-aaf8-e9374e5a5040')
				.single();

			if (error) throw error;
			if (!data) throw new Error('Privacy page not found');

			return {
				...data,
				content: data.content as unknown as Block[],
			};
		},
	});

	if (isLoading) {
		return (
			<div className='container mx-auto px-4 py-16 mt-20'>
				<div className='animate-pulse'>
					<div className='h-8 bg-muted rounded w-1/4 mb-8'></div>
					<div className='space-y-4'>
						<div className='h-4 bg-muted rounded w-3/4'></div>
						<div className='h-4 bg-muted rounded w-2/3'></div>
						<div className='h-4 bg-muted rounded w-1/2'></div>
					</div>
				</div>
			</div>
		);
	}

	const contentHtml = page?.content
		? wrapListItems(page.content.map(convertBlockToHtml).join(''))
		: '';

	return (
		<div className='max-w-screen-lg mx-auto px-4 py-16 mt-20'>
			<h1 className='text-4xl font-bold mb-8'>
				{page?.title || 'Privacybeleid'}
			</h1>
			<p className='text-lg text-muted-foreground mb-8'>
				Laatst bijgewerkt:{' '}
				{page?.updated_at
					? format(new Date(page.updated_at), 'd MMMM yyyy', {
							locale: nl,
					  })
					: ''}
			</p>
			<div
				className='legal-content'
				dangerouslySetInnerHTML={{ __html: contentHtml }}
			/>
		</div>
	);
};

export default Privacy;
