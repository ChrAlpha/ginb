import type { ReactNode } from "react";

interface PostLayoutProps {
  children: ReactNode;
}

function PostLayout({ children }: PostLayoutProps) {
  return children;
}

export default PostLayout;
