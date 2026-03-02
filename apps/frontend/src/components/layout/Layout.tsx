import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = 'flex-1' }) => {
  return (
    <div className={`min-h-screen bg-[var(--light-bg)] text-[var(--light-text)] selection:bg-indigo-500/20 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
