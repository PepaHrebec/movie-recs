"use client";

import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>We couldn&apos;t have found this movie, sorry.</h2>
      <Link href={"/"}>Go back home</Link>
    </div>
  );
}
