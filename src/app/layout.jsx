import Header from "./header";
import Footer from "./footer";
import Left from "/src/components/Left";
import { ThemeProviders } from "../components/ToggleTheme";
import "./globals.css";
import {
  sitename,
  username,
  description,
  keywords,
  url,
  favicon,
} from "/_config";

export const runtime = "edge";

export const metadata = {
  metadataBase: new URL(url),
  title: sitename,
  description: description,
  keywords: keywords,
  author: username,
  openGraph: {
    title: sitename,
    siteName: sitename,
    description: description,
    images: [
      {
        url: favicon,
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
    title: sitename,
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="dark:bg-black dark:text-white break-words">
        <ThemeProviders>
          <Header />
          <div className="container min-h-[calc(100vh_-_96px)] max-w-screen-xl mx-auto p-4 md:flex md:gap-4">
            <div className="md:flex-1 md:max-w-[calc(100%_-_304px)]">
              {children}
            </div>
            <div className="md:order-first md:basis-72">
              <hr className="md:hidden w-2/3 mx-auto my-12" />
              <Left />
            </div>
          </div>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
