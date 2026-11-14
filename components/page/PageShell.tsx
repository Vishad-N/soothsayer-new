import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

/** Same header and footer as the homepage, with the logo pointing back to "/". */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar homeHref="/" />
      <main id="main">{children}</main>
      <Footer homeHref="/" />
    </>
  );
}
