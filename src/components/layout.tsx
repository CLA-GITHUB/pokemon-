import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <div className='max-w-2xl mx-auto px-3'>{children}</div>;
}

export default Layout;
