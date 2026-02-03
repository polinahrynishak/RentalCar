import css from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className={css.hero}>
        <Image
          src="/hero-pic-car.webp"
          alt="A modern car driving on the road in the sunset"
          fill
          priority
          className={css.heroImage}
        />
        <div className={css.container}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.description}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link href="/catalog">
            <button className={css.homeBtn}>View Catalog</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
