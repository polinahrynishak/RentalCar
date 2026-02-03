import { Car } from "@/types/car";
import CarCard from "@/components/CarCard/CarCard";
import css from "./CarList.module.css";

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  return (
    <section className={css.container}>
      <ul className={css.list}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CarList;
