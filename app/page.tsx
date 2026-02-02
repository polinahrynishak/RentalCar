import css from "./page.module.css";
import Image from "next/image";

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
          <button className={css.homeBtn}>View Catalog</button>
        </div>
      </section>
    </main>
  );
}
