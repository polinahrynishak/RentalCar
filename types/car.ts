export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export type BrandsResponse = string[];

export const formatId = (id: string): string => {
  if (!id) return "";

  const numbers0nly = id.replace(/\D/g, "");
  return numbers0nly.slice(0, 4);
};

export const formatMileage = (mileage: number): string => {
  const value = typeof mileage === "string" ? parseInt(mileage, 10) : mileage;
  if (isNaN(value)) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
