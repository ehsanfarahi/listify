import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Constants
import { appName, appDescription } from "./_constants";

export const metadata = {
  title: appName,
  description: appDescription,
};

// Components
import { Header } from "./_components/Header";
import Footer from "./_components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Header />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  ); 
}
