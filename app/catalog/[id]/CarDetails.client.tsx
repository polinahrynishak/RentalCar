"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchCarById } from "@/lib/api";
import css from "./CarDetails.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CarDetailsClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields!");
      return;
    }

    console.log("Booking Submitted:", formData);

    toast.success("Thank you! Your booking request has been sent.", {
      duration: 4000,
      style: {
        borderRadius: "12px",
        background: "#3470FF",
        color: "#fff",
      },
    });

    setFormData({ name: "", email: "", bookingDate: "", comment: "" });
  };

  const params = useParams();
  const id = params?.id as string;

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
    enabled: !!id,
  });

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (isError || !car) return <div className={css.error}>Car not found</div>;

  return (
    <div className={css.container}>
      {/* ЛІВА КОЛОНКА */}
      <div className={css.leftColumn}>
        <div className={css.imageWrapper}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            className={css.mainImage}
          />
        </div>

        <div className={css.bookingForm}>
          <h3>Book your car now</h3>
          <p>Stay connected! We are always ready to help you.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bookingDate"
              placeholder="Booking date"
              value={formData.bookingDate}
              onChange={handleChange}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!formData.bookingDate) e.target.type = "text";
              }}
            />
            <textarea
              name="comment"
              placeholder="Comment"
              value={formData.comment}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className={css.submitBtn}>
              Send
            </button>
          </form>
        </div>
      </div>

      {/* ПРАВА КОЛОНКА */}
      <div className={css.rightColumn}>
        <div className={css.header}>
          <h2>
            {car.brand} {car.model}, {car.year}{" "}
            <span className={css.carId}>Id: {car.id}</span>
          </h2>
          <div className={css.locationInfo}>
            <span>
              {car.address.split(",")[1]}, {car.address.split(",")[2]}
            </span>
            <span>Mileage: {car.mileage.toLocaleString("en-US")} km</span>
          </div>
          <p className={css.price}>${car.rentalPrice}</p>
        </div>

        <p className={css.description}>{car.description}</p>

        <section className={css.section}>
          <h3>Rental Conditions:</h3>
          <ul className={css.list}>
            {Array.isArray(car.rentalConditions) ? (
              car.rentalConditions.map((condition, i) => (
                <li key={i}>{condition}</li>
              ))
            ) : (
              <li>{car.rentalConditions}</li>
            )}
          </ul>
        </section>

        <section className={css.section}>
          <h3>Car Specifications:</h3>
          <ul className={css.specsList}>
            <li>Year: {car.year}</li>
            <li>Type: {car.type}</li>
            <li>Fuel Consumption: {car.fuelConsumption}</li>
            <li>Engine Size: {car.engineSize}</li>
          </ul>
        </section>

        <section className={css.section}>
          <h3>Accessories and functionalities:</h3>
          <ul className={css.list}>
            {car.accessories.concat(car.functionalities).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
