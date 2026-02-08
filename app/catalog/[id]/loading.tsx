import Loader from "@/components/Status/Loader";
import css from "./CarDetails.module.css";

export default function CarDetailsLoading() {
  return (
    <div className={css.wrapper}>
      <Loader />
    </div>
  );
}
