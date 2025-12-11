"use client";
import { useState } from "react";
import Link from "next/link";

export default function PoliciesModal() {
  const [open, setOpen] = useState(true);
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 text-2xl font-bold"
          aria-label="Close policies popup"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Our Policies</h2>
        <div className="prose max-w-none text-sm mb-4">
          <p>
            Please review our <Link href="/policies" className="text-blue-600 underline">Return & Refund Policy</Link>, <Link href="/policies" className="text-blue-600 underline">Shipping & Delivery Policy</Link>, and <Link href="/policies" className="text-blue-600 underline">Bulk Orders & Wholesale Supply</Link> for important information about returns, shipping timelines, and bulk buying.
          </p>
          <ul className="list-disc ml-6">
            <li>Returns accepted for damaged, defective, or incorrect items (see full policy).</li>
            <li>Shipping within 2–10 business days depending on location.</li>
            <li>Bulk buyers get best prices, pan-India delivery, and GeM support.</li>
          </ul>
        </div>
        <Link href="/policies" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-semibold">Read Full Policies</Link>
      </div>
    </div>
  ) : null;
}
