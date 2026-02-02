import Link from "next/link";
import css from "./Header.module.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        <svg
          className={css.svgLogo}
          width="104"
          height="16"
          role="img"
          aria-hidden="true"
        >
          <use href="/icons.svg#Logo" />
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
