import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCarById } from "@/lib/api";
import CarDetails from "./CarDetails.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetails />
    </HydrationBoundary>
  );
}
