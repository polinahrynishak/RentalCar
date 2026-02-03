"use client";

export default function Error({ error }: { error: Error }) {
  return <p>Could not fetch the list of cars. {error.message}</p>;
}
