import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AuthorCard from "@/components/AuthorCard";
import { ThemeProviders } from "../components/ToggleTheme";
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
    <html suppressHydrationWarning>
      <body className={`
        wrap-break-word
        dark:bg-black dark:text-white
      `}
      >
        <ThemeProviders>
          <Header />
          <div className={`
            container mx-auto min-h-[calc(100vh-96px)] max-w-7xl p-4
            md:flex md:gap-4
          `}
          >
            <div className={`
              md:max-w-[calc(100%-272px)] md:flex-1
              lg:max-w-[calc(100%-304px)]
            `}
            >
              {children}
            </div>
            <div className={`
              md:order-first md:basis-64
              lg:basis-72
            `}
            >
              <hr className={`
                mx-auto my-12 w-2/3
                md:hidden
              `}
              />
              <AuthorCard />
            </div>
          </div>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
