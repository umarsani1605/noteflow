import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/img/logo.svg";
import Button from "../components/common/Button";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementasi logika register disini
    console.log("Form submitted:", formData);
    navigate("/login");
  };

  return (
    <div className="mx-auto flex h-screen w-[750px] flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col gap-6 rounded-xl bg-white px-12 py-14 shadow">
        <div className="mb-4 flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="mb-2 h-12 w-auto" />
          <h1 className="text-2xl font-bold text-slate-700">NoteFlow</h1>
        </div>
        <h2 className="mb-2 text-center text-3xl font-extrabold text-slate-700">
          Daftar Akun
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm text-slate-500">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-96 rounded-lg bg-slate-200 px-4 py-2 outline-2 outline-transparent transition-[outline] duration-300 hover:outline-slate-300 focus:outline-[#007afc]"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="text-sm text-slate-500">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-96 rounded-lg bg-slate-200 px-4 py-2 outline-2 outline-transparent transition-[outline] duration-300 hover:outline-slate-300 focus:outline-[#007afc]"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword" className="text-sm text-slate-500">
            Konfirmasi Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            required
            className="mb-4 w-96 rounded-lg bg-slate-200 px-4 py-2 outline-2 outline-transparent transition-[outline] duration-300 hover:outline-slate-300 focus:outline-[#007afc]"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button variant="primary">Daftar</Button>
        </form>
        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
