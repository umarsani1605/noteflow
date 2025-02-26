import React from 'react';
import { useRouteError } from 'react-router';

function NotFound() {
  const error = useRouteError();

  console.log(error);

  return (
    <div className="bg-slate-50 h-screen flex flex-col justify-between ">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-6xl font-bold text-slate-700">404</h1>
        <p className="text-2xl text-slate-500">Halaman tidak ditemukan</p>
      </div>
    </div>
  );
}

export default NotFound;
