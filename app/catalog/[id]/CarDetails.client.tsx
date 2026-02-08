"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCarById } from "@/lib/api";
import css from "./CarDetails.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "@/components/Status/Loader";
import ErrorMessage from "@/components/Status/ErrorMessage";
import { formatId } from "@/types/car";
import { formatMileage } from "@/types/car";

function Icon({
  id,
  className,
  size = 16,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      aria-hidden
      focusable={false}
    >
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}

function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start && !end) return "";
  if (start && !end) return start.toLocaleDateString("en-CA");
  if (!start && end) return end.toLocaleDateString("en-CA");
  return `${(start as Date).toLocaleDateString("en-CA")} - ${(end as Date).toLocaleDateString("en-CA")}`;
}

export default function CarDetailsClient() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateRangeChange = (
    dates: [Date | null, Date | null],
  ) => {
    const [start, end] = dates;
    setStartDate(start ?? null);
    setEndDate(end ?? null);
    setFormData((prev) => ({
      ...prev,
      bookingDate: formatDateRange(start ?? null, end ?? null),
    }));
  };

  const params = useParams();
  const id = params?.id as string;

  const {
    data: car,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
    enabled: !!id,
  });

  if (isLoading || (isFetching && !car))
    return (
      <div className={css.wrapper}>
        <Loader />
      </div>
    );
  if (isError || !car)
    return (
      <div className={css.wrapper}>
        <ErrorMessage />
      </div>
    );

  const locationText = (() => {
    const parts = car.address.split(",").map((s) => s.trim());
    return parts.length >= 2 ? parts.slice(-2).join(", ") : car.address;
  })();

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        {/* ЛІВА КОЛОНКА */}
        <div className={css.leftColumn}>
          <div className={css.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className={css.mainImage}
              loading="eager"
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
              <div className={css.datepickerWrap}>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateRangeChange}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Booking date"
                  className={css.datepickerInput}
                  calendarClassName={css.datepickerCalendar}
                  calendarStartDay={1}
                />
              </div>
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
              <span className={css.carId}>Id: {formatId(car.id)} </span>
            </h2>
            <div className={css.locationInfo}>
              <span className={css.locationRow}>
                <span className={css.icon}>
                  <Icon id="Location" />
                </span>
                {locationText}
              </span>
              <span className={css.mileageRow}>
                Mileage: {formatMileage(car.mileage)} km
              </span>
            </div>
            <p className={css.price}>${car.rentalPrice}</p>
          </div>

          <p className={css.description}>{car.description}</p>

          <section className={css.section}>
            <h3>Rental Conditions:</h3>
            <ul className={css.list}>
              {Array.isArray(car.rentalConditions) ? (
                car.rentalConditions.map((condition, i) => (
                  <li key={i}>
                    <span className={css.iconWrap}>
                      <Icon id="VectorO" />
                    </span>
                    {condition}
                  </li>
                ))
              ) : (
                <li>
                  <span className={css.iconWrap}>
                    <Icon id="VectorO" />
                  </span>
                  {car.rentalConditions}
                </li>
              )}
            </ul>
          </section>

          <section className={css.section}>
            <h3>Car Specifications:</h3>
            <ul className={css.specsList}>
              <li>
                <span className={css.iconWrap}>
                  <Icon id="Calendar" />
                </span>
                Year: {car.year}
              </li>
              <li>
                <span className={css.iconWrap}>
                  <Icon id="Car" />
                </span>
                Type: {car.type}
              </li>
              <li>
                <span className={css.iconWrap}>
                  <Icon id="Oil" />
                </span>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <span className={css.iconWrap}>
                  <Icon id="Setting" />
                </span>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </section>

          <section className={css.section}>
            <h3>Accessories and functionalities:</h3>
            <ul className={css.list}>
              {car.accessories.concat(car.functionalities).map((item, i) => (
                <li key={i}>
                  <span className={css.iconWrap}>
                    <Icon id="VectorO" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
