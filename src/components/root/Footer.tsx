'use client';

import { logout } from '@/lib/actions/logout';
import { useCurrentUser } from '@/lib/hooks/use-current-uer';
import { cn } from '@/lib/utils';
import { PowerIcon } from '@heroicons/react/24/outline';

declare interface FooterProps {
  type?: 'mobile' | 'desktop';
}

const Footer = ({ type = 'desktop' }: FooterProps) => {
  const user = useCurrentUser();
  const handleLogOut = () => {
    logout();
  };

  return (
    <footer className="flex items-center justify-between border-t-2 py-5">
      <div
        className={cn('flex cursor-pointer items-center gap-2', {
          'max-xl:hidden': type === 'desktop',
        })}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <p className="text-xl font-bold text-gray-700">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="max-w-[160px] truncate text-sm font-semibold text-gray-700">
            {user?.name}
          </h1>
          <p className="max-w-[160px] truncate text-sm font-normal text-gray-600">
            {user?.email}
          </p>
        </div>
      </div>

      <PowerIcon
        className={cn('w-6 cursor-pointer text-gray-700', {
          'max-xl:mx-auto': type === 'desktop',
        })}
        onClick={handleLogOut}
      />
    </footer>
  );
};

export default Footer;
