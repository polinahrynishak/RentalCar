import axios from "axios";
import { Car, BrandsResponse } from "@/types/car";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
  // headers: {
  //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_RENTALCAR_TOKEN}`,
  // },
});

export interface FetchCarsParams {
  page?: number;
  limit?: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

export interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface FilterValues {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

// export interface FetchCarsParams extends Partial<FilterValues> {
//   page?: number;
//   limit?: number;
// }

export const fetchCars = async ({
  page = 1,
  limit = 12,
  brand = "",
  rentalPrice = "",
  minMileage = "",
  maxMileage = "",
}: FetchCarsParams): Promise<FetchCarsResponse> => {
  const response = await api.get<FetchCarsResponse>("cars", {
    params: {
      page,
      limit,
      brand: brand || undefined,
      rentalPrice: rentalPrice || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    },
  });
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`cars/${id}`);
  return response.data;
};

export const fetchBrands = async (): Promise<BrandsResponse> => {
  const response = await api.get<BrandsResponse>("brands");
  return response.data;
};
