import React from "react";
import { useNavigate } from "react-router";

import Button from "../components/common/Button";

function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col justify-between ">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-6xl font-bold text-slate-700">404</h1>
        <p className="text-2xl text-slate-700">Halaman tidak ditemukan</p>
        <Button variant="secondary" onClick={handleClick}>
          Kembali ke halaman utama
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
