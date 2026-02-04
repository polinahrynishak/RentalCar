"use client";

export default function Error({ error }: { error: Error }) {
  return <p>Could not fetch car details. {error.message}</p>;
}
