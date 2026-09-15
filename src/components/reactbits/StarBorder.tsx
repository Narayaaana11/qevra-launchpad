import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

export const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#38bdf8',
  speed = '4s',
  thickness = 1,
  backgroundColor = 'transparent',
  textColor = '#ffffff',
  borderColor = 'rgba(255, 255, 255, 0.15)',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        ...(rest as any).style
      }}
    >
      <div
        className="absolute w-[300%] h-[60%] opacity-80 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed
        }}
      />
      <div
        className="absolute w-[300%] h-[60%] opacity-80 top-[-10px] left-[-250%] rounded-full animate-star-movement-top pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed
        }}
      />
      <div
        className="relative z-10 w-full h-full rounded-[inherit] flex items-center justify-center"
        style={{ background: backgroundColor, color: textColor }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
