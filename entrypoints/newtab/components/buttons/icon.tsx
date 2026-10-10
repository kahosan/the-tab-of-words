'use client';

import { cn } from '../../lib/utils';
import type React from 'react';

const sizes = {
  default: 'size-6',
  sm: 'size-3',
  md: 'size-7',
  lg: 'size-9'
};

type IconButtonProps = React.ComponentProps<'button' | 'a'> & {
  icon: React.ElementType<React.RefAttributes<SVGSVGElement>>
  active?: boolean
  className?: string
  size?: keyof typeof sizes
  as?: React.ElementType
};

function IconButton({
  icon: Icon,
  className,
  active = false,
  size = 'default',
  as: Component = 'button',
  ...props
}: IconButtonProps) {
  return (
    <Component
      data-slot="icon-button"
      className={cn(
        `group/icon-button cursor-pointer relative inline-flex shrink-0 rounded-full transition-colors hover:text-(--icon-ac) ${active ? 'text-(--icon-ac)' : 'text-(--icon-fg)'}`,
        sizes[size],
        className
      )}
      {...props}
    >
      <Icon strokeWidth={2} />
    </Component>
  );
}

export { IconButton, type IconButtonProps };
