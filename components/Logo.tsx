import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  isHero?: boolean;
}

export function Logo({ className = '', showText = true, layout = 'horizontal' }: LogoProps) {
  const isVertical = layout === 'vertical';

  return (
    <a
      href="/"
      aria-label="Innovation Ark home"
      className={`group inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#07090d] ${className}`}
    >
      {showText ? (
        <span
          className={`relative block overflow-visible ${
            isVertical
              ? 'w-[220px] sm:w-[280px]'
              : 'w-[158px] sm:w-[205px]'
          }`}
        >
          <img
            src="/images/innovation-ark-wordmark.png"
            alt=""
            className="block h-auto w-full transition-opacity duration-200 group-hover:opacity-80 dark:hidden"
          />
          <img
            src="/images/innovation-ark-wordmark-dark.png"
            alt=""
            className="hidden h-auto w-full transition-opacity duration-200 group-hover:opacity-80 dark:block"
          />
        </span>
      ) : (
        <img
          src="/images/logo_mark.png"
          alt=""
          className={`${isVertical ? 'h-20 w-20' : 'h-9 w-9'} object-contain`}
        />
      )}
    </a>
  );
}

export default Logo;
