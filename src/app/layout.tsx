import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AuthorCard from "@/components/AuthorCard";
import { ThemeProviders } from "../components/ToggleTheme";
import MainLayout from "../components/layout/MainLayout";
import "./globals.css";
import { site, github, url } from "/_config";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: `%s | ${site.title}`,
    default: site.title,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: github.owner }],
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.title,
    url: "/",
    images: [
      {
        url: site.favicon,
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "16x16",
        type: "image/ico",
      },
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/ico",
      },
    ],
  },
  appleWebApp: {
    title: site.title,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      suppressHydrationWarning
      data-color-mode="auto"
      data-light-theme="light"
      data-dark-theme="dark"
    >
      <body>
        <ThemeProviders>
          <MainLayout
            header={<Header title={site.title} owner={github.owner} />}
            sidebar={<AuthorCard />}
            footer={<Footer />}
          >
            {children}
          </MainLayout>
        </ThemeProviders>
      </body>
    </html>
  );
}
