# RentalCar

**Car rental catalog web app** — browse and search cars with filters, favorites, and a booking form.

---

## Short description

RentalCar is a modern Next.js app for browsing a catalog of rental cars. Users can search by brand, price, and mileage, view detailed info for each car, and submit a booking request. Favorites are stored in the browser.

---

## Main features

- **Home page** — hero section with a link to the catalog
- **Car catalog** — grid of cards with photo, brand, model, year, price, and mileage
- **Search filters:**
  - car brand (select from API)
  - rental price (30 to 150)
  - min and max mileage
- **Pagination** — switch between catalog pages
- **Car details page** — full info (description, fuel, engine, accessories, rental conditions, etc.)
- **Booking form** — name, email, date, comment; validation and toast notifications
- **Favorites** — add/remove cars to favorites, persisted in `localStorage`

---

## Tech stack

- **Next.js** (App Router)
- **React**, **TypeScript**
- **TanStack Query** — data fetching and caching
- **Zustand** — state (filters, favorites) with persist
- **Axios** — API requests
- **Radix UI Select**, **react-datepicker**, **react-hot-toast**
- **CSS Modules** for styling

---

## Installation

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd RentalCar
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open in the browser: [http://localhost:3000](http://localhost:3000).

---

## Author

Portfolio project.  
Author: [polinahrynishak](https://github.com/polinahrynishak)

---
