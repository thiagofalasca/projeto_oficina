import { cn } from '@/lib/utils';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface FooterProps {
  type?: 'mobile' | 'desktop';
  user: loggedUser;
}

const Footer = async ({ type = 'desktop', user }: FooterProps) => {
  return (
    <footer className="footer">
      <div
        className={cn('footer-div', { 'max-xl:hidden': type === 'desktop' })}
      >
        <div className="footer-icon">
          <UserIcon width={25} />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="footer-name">{user.name}</h1>
          <p className="footer-email">{user.email}</p>
        </div>
      </div>

      <Link
        href="/api/auth/sign-out"
        className={cn('cursor-pointer', {
          'max-xl:mx-auto': type === 'desktop',
        })}
      >
        <PowerIcon className="w-6 text-gray-700" />
      </Link>
    </footer>
  );
};

export default Footer;
