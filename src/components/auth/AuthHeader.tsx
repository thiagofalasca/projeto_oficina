import React from 'react';

interface AuthHeaderProps {
  title: string;
  subText?: string;
  variant?: keyof typeof variants;
  titleSize?: keyof typeof titleSizes;
}

const variants = {
  normal: {
    titleColor: 'text-blue-700',
  },
  success: {
    titleColor: 'text-green-700',
  },
  error: {
    titleColor: 'text-red-700',
  },
};

const titleSizes = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
};

const AuthHeader = ({
  title,
  subText,
  variant = 'normal',
  titleSize = 'sm',
}: AuthHeaderProps) => {
  const { titleColor } = variants[variant];
  const title_size = titleSizes[titleSize] || titleSizes.sm;
  return (
    <header className="auth-header">
      <h1 className={`font-semibold ${titleColor} ${title_size}`}>{title}</h1>
      {subText && <p className="text-gray-600">{subText}</p>}
    </header>
  );
};

export default AuthHeader;
