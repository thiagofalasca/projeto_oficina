import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

declare interface AppLogoProps {
  type?: 'mobile' | 'desktop';
}

export default function AppLogo({ type = 'desktop' }: AppLogoProps) {
  return (
    <Link
      href="/workshops"
      className={cn('flex cursor-pointer items-center justify-start gap-3', {
        'mb-12 max-xl:justify-center': type === 'desktop',
      })}
    >
      <Image
        src="/logo.svg"
        width={35}
        height={35}
        alt="Logo"
        className="size-8"
      />
      <h1
        className={cn('text-xl font-semibold text-gray-900 xl:text-2xl', {
          'max-xl:hidden': type === 'desktop',
        })}
      >
        AppName
      </h1>
    </Link>
  );
}
