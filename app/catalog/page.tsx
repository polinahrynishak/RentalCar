import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import CatalogClient from "./Catalog.client";

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  const filters = {
    page: 1,
    limit: 12,
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  };

  await queryClient.prefetchQuery({
    queryKey: ["cars", filters],
    queryFn: () => fetchCars(filters),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <CatalogClient initialFilters={filters} />
    </HydrationBoundary>
  );
}
