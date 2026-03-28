import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tynec-gray">404</p>
      <h1 className="mt-3 text-2xl font-bold text-tynec-black">Stránka nenalezena</h1>
      <p className="mt-4 max-w-md text-tynec-gray">
        Tato adresa neexistuje nebo byla přesunuta.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover"
      >
        Na úvod
      </Link>
    </div>
  );
}
