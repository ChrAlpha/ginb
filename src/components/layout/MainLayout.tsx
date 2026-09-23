"use client";

import { PageLayout } from "@primer/react";
import type { ReactNode } from "react";

interface MainLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

const HEADER_HEIGHT = "48px";

export default function MainLayout({ header, sidebar, footer, children }: MainLayoutProps) {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 3,
          backgroundColor: "var(--bgColor-default)",
          borderBottom: "1px solid var(--borderColor-muted)",
        }}
      >
        {header}
      </header>
      {/* Same container as the header; mt-md-4 leaves room for the avatar's mt-md-n5 overlap */}
      <div className="container-xl px-3 px-md-4 px-lg-5 mt-3 mt-md-4">
        <PageLayout
          containerWidth="full"
          padding="none"
          rowGap="normal"
          columnGap="normal"
        >
          <PageLayout.Content>
            {children}
          </PageLayout.Content>
          <PageLayout.Pane
            position={{ regular: "start", narrow: "end" }}
            width="medium"
            divider={{ narrow: "line" }}
            offsetHeader={HEADER_HEIGHT}
          >
            {sidebar}
          </PageLayout.Pane>
          <PageLayout.Footer padding="none">
            {footer}
          </PageLayout.Footer>
        </PageLayout>
      </div>
    </>
  );
}
