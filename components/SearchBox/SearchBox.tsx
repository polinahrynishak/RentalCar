import css from "./SearchBox.module.css";
import { useState } from "react";
import { FilterValues } from "@/lib/api";

interface SearchBoxProps {
  brands: string[];
  onSearch: (filters: FilterValues) => void;
}

const priceOptions: number[] = [];

for (let i = 30; i <= 150; i += 10) {
  priceOptions.push(i);
}

const SearchBox = ({ brands, onSearch }: SearchBoxProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);

  const handleChange = (name: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <section className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* Селект Брендів */}
        <div className={css.filterGroup}>
          <label className={css.label}>Car brand</label>
          <div className={css.customSelectWrapper}>
            <select
              className={css.selectBrand}
              value={filters.brand}
              onFocus={() => setIsOpenBrand(true)}
              onBlur={() => setIsOpenBrand(false)}
              onChange={(e) => {
                handleChange("brand", e.target.value);
                e.target.blur();
              }}
            >
              <option value="">Choose a brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <svg className={css.chevronIcon}>
              <use href={`/icons.svg#${isOpenBrand ? "Up" : "Down"}`} />
            </svg>
          </div>
        </div>

        {/* Селект Цін */}
        <div className={css.filterGroup}>
          <label className={css.label}>Price / 1 hour</label>
          <div className={css.customSelectWrapper}>
            <select
              className={css.selectPrice}
              value={filters.rentalPrice}
              onFocus={() => setIsOpenPrice(true)}
              onBlur={() => setIsOpenPrice(false)}
              onChange={(e) => {
                handleChange("rentalPrice", e.target.value);
                e.target.blur();
              }}
            >
              <option value="">Choose a price</option>
              {priceOptions.map((p) => (
                <option key={p} value={String(p)}>
                  To {p}$
                </option>
              ))}
            </select>

            <svg className={css.chevronIcon}>
              <use href={`/icons.svg#${isOpenPrice ? "Up" : "Down"}`} />
            </svg>
          </div>
        </div>

        {/* Поля пробігу */}
        <div className={css.filterGroup}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.mileageContainer}>
            {/* Поле From */}
            <div className={css.inputWrapper}>
              <span className={css.inputPrefix}>From</span>
              <input
                className={css.mileageInputLeft}
                type="text"
                value={filters.minMileage}
                onChange={(e) =>
                  handleChange(
                    "minMileage",
                    e.target.value.replace(/[^0-9]/g, ""),
                  )
                }
              />
            </div>
            {/* Поле To */}
            <div className={css.inputWrapper}>
              <span className={css.inputPrefix}>To</span>
              <input
                className={css.mileageInputRight}
                type="text"
                value={filters.maxMileage}
                onChange={(e) =>
                  handleChange(
                    "maxMileage",
                    e.target.value.replace(/[^0-9]/g, ""),
                  )
                }
              />
            </div>
          </div>
        </div>

        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchBox;
