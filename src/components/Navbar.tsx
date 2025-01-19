import { Link } from 'react-router-dom';
import { MobileNav } from './nav/MobileNav';
import { NavLinks } from './nav/NavLinks';
import { UserMenu } from './nav/UserMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useHomeContent } from '@/hooks/use-home-content';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
	const isMobile = useIsMobile();
	const { session, isAdmin, signOut } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const { data: content } = useHomeContent();

	return (
		<header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b'>
			<nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
				<Link
					to='/'
					className='font-serif text-xl'
				>
					{content?.navbar_logo ? (
						<img
							src={content.navbar_logo}
							alt='Logo'
							className='h-8 w-auto'
						/>
					) : (
						<span className='font-medium'>
							{content?.navbar_text || 'stretchtent verhuur'}
						</span>
					)}
				</Link>

				{isMobile ? (
					<>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => setIsOpen(!isOpen)}
							aria-label={isOpen ? 'Close menu' : 'Open menu'}
						>
							{isOpen ? (
								<X className='h-6 w-6' />
							) : (
								<Menu className='h-6 w-6' />
							)}
						</Button>
						<MobileNav
							isOpen={isOpen}
							session={!!session}
							isAdmin={isAdmin}
							signOut={signOut}
							onClose={() => setIsOpen(false)}
						/>
					</>
				) : (
					<div className='flex items-center gap-8'>
						<NavLinks />
						{session && isAdmin && <UserMenu signOut={signOut} />}
					</div>
				)}
			</nav>
		</header>
	);
};
