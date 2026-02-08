"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCars, fetchBrands, FilterValues } from "@/lib/api";
import { useCarStore } from "@/store/useCarStore";
import CarList from "@/components/CarList/CarList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Status/Loader";
import ErrorMessage from "@/components/Status/ErrorMessage";
import EmptyState from "@/components/Status/EmptyState";
import css from "./page.module.css";

export const CatalogClient = () => {
  const { filters, setFilters, setCars, resetCars, cars } = useCarStore();
  const [limit, setLimit] = useState(12);

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars", filters, limit],
    queryFn: () => fetchCars({ ...filters, page: 1, limit }),
    placeholderData: keepPreviousData,
  });

  if (data && data.cars !== cars) {
    setCars(data.cars);
  }

  const handleSearch = (newFilters: FilterValues) => {
    resetCars();
    setFilters(newFilters);
    setLimit(12); 
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 12); 
  };

  const hasMore = data ? data.cars.length < data.totalCars : false;

  return (
    <div className={css.app}>
      <section className={css.filterSection}>
        <SearchBox brands={brands} onSearch={handleSearch} />
      </section>

      <main className={css.main}>
        {isLoading && limit === 12 && <Loader />}

        {isError && <ErrorMessage />}

        {cars.length > 0 ? (
          <CarList cars={cars} />
        ) : (
          !isLoading && !isError && data && <EmptyState />
        )}

        {hasMore && (
          <button
            type="button"
            className={css.loadMoreBtn}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </main>
    </div>
  );
};

export default CatalogClient;
