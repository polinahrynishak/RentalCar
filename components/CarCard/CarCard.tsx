import { Car } from "@/types/car";
import css from "./CarCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { useCarStore } from "@/store/useCarStore";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const { favorites, toggleFavorite } = useCarStore();

  const isFavorite = favorites.includes(car.id);

  const addressParts = car.address.split(", ");
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];

  const mileageStr = car.mileage.toString();
  const formattedMileage =
    mileageStr.length > 3
      ? mileageStr.slice(0, -3) + " " + mileageStr.slice(-3)
      : mileageStr;

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          className={css.image}
          sizes="(max-width: 768px) 100vw, 276px"
        />
        <button
          className={css.favoriteBtn}
          onClick={() => toggleFavorite(car.id)}
          type="button"
        >
          <svg
            width="16"
            height="16"
            className={isFavorite ? css.iconActive : css.iconNormal}
          >
            <use href={`/icons.svg#${isFavorite ? "Love-blue" : "Love"}`} />
          </svg>
        </button>
      </div>

      <div className={css.info}>
        <div className={css.titleLine}>
          <h3 className={css.title}>
            {car.brand} <span className={css.accent}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>

        <div className={css.details}>
          <span>{city}</span> | <span>{country}</span> |{" "}
          <span>{car.rentalCompany}</span>
        </div>
        <div className={css.details}>
          <span>{car.type}</span> | <span>{formattedMileage} km</span>
        </div>
      </div>

      <Link href={`/catalog/${car.id}`} className={css.readMoreBtn}>
        Read more
      </Link>
    </div>
  );
};

export default CarCard;
