"use client";

import css from "./SearchBox.module.css";
import { useState } from "react";
import { FilterValues } from "@/lib/api";
import { useCarStore } from "@/store/useCarStore";
import * as Select from "@radix-ui/react-select";

interface SearchBoxProps {
  brands: string[];
  onSearch: (filters: FilterValues) => void;
}

const priceOptions: number[] = [];
for (let i = 30; i <= 150; i += 10) {
  priceOptions.push(i);
}

const SearchBox = ({ brands, onSearch }: SearchBoxProps) => {
  const { filters: storeFilters, setFilters: setStoreFilters } = useCarStore();
  const [localFilters, setLocalFilters] = useState<FilterValues>(storeFilters);

  const handleChange = (name: keyof FilterValues, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoreFilters(localFilters);
    onSearch(localFilters);
  };

  return (
    <section className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        {/* Селект брендів */}
        <div className={css.filterGroup}>
          <label className={css.label}>Car brand</label>
          <Select.Root
            value={localFilters.brand || undefined}
            onValueChange={(value) => handleChange("brand", value || "")}
          >
            <Select.Trigger className={css.selectTrigger} aria-label="Car brand">
              <Select.Value placeholder="Choose a brand" />
              <svg className={css.chevronIcon} aria-hidden>
                <use href="/icons.svg#Down" />
              </svg>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className={css.selectContent}
                position="popper"
                sideOffset={0}
                align="start"
                collisionPadding={0}
              >
                <Select.Viewport className={css.selectViewport}>
                  {brands.map((b) => (
                    <Select.Item
                      key={b}
                      className={css.selectItem}
                      value={b}
                      textValue={b}
                    >
                      <Select.ItemText>{b}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Селект цін */}
        <div className={css.filterGroup}>
          <label className={css.label}>Price / 1 hour</label>
          <Select.Root
            value={localFilters.rentalPrice || undefined}
            onValueChange={(value) => handleChange("rentalPrice", value || "")}
          >
            <Select.Trigger className={css.selectTrigger} aria-label="Price per hour">
              {localFilters.rentalPrice ? (
                `To $${localFilters.rentalPrice}`
              ) : (
                <Select.Value placeholder="Choose a price" />
              )}
              <svg className={css.chevronIcon} aria-hidden>
                <use href="/icons.svg#Down" />
              </svg>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className={css.selectContent}
                position="popper"
                sideOffset={0}
                align="start"
                collisionPadding={0}
              >
                <Select.Viewport className={css.selectViewport}>
                  {priceOptions.map((p) => (
                    <Select.Item
                      key={p}
                      className={css.selectItem}
                      value={String(p)}
                      textValue={String(p)}
                    >
                      <Select.ItemText>{p}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Поля пробігу */}
        <div className={css.filterGroup}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.mileageContainer}>
            <div className={css.inputWrapper}>
              <span className={css.inputPrefix}>From</span>
              <input
                className={css.mileageInputLeft}
                type="text"
                value={localFilters.minMileage}
                onChange={(e) =>
                  handleChange(
                    "minMileage",
                    e.target.value.replace(/[^0-9]/g, ""),
                  )
                }
              />
            </div>
            <div className={css.inputWrapper}>
              <span className={css.inputPrefix}>To</span>
              <input
                className={css.mileageInputRight}
                type="text"
                value={localFilters.maxMileage}
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
