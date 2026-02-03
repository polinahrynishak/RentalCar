import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterValues } from "@/lib/api";
import { Car } from "@/types/car";

interface CarState {
  cars: Car[];
  filters: FilterValues;
  favorites: string[];
  setCars: (cars: Car[]) => void;
  setFilters: (filters: FilterValues) => void;
  toggleFavorite: (id: string) => void;
  resetCars: () => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      cars: [],
      filters: {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      },
      favorites: [],

      setCars: (cars) => set({ cars }),

      setFilters: (filters) => set({ filters }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      resetCars: () => set({ cars: [] }),
    }),
    {
      name: "car-storage", // назва ключа в localStorage

      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
