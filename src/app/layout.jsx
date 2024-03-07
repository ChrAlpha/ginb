import Header from "./header";
import Footer from "./footer";
import Left from "/src/components/Left";
import { ThemeProviders } from "../components/ToggleTheme";
import "./globals.css";

export const runtime = "edge";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="dark:bg-black dark:text-white break-words">
        <ThemeProviders>
          <Header />
          <div className="container min-h-[calc(100vh_-_96px)] max-w-screen-xl mx-auto p-4 md:flex md:gap-4">
            {children}
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
