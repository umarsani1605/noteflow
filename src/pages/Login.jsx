import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/img/logo.svg";
import Button from "../components/common/Button";
import { login, putAccessToken } from "../utils/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { accessToken } = await login(formData);
      putAccessToken(accessToken);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen w-[750px] flex-col items-center justify-center">
      <div className="flex flex-col gap-6 rounded-xl bg-white px-12 py-14 shadow">
        <div className="mb-4 flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="mb-2 h-12 w-auto" />
          <h1 className="text-2xl font-bold text-slate-700">NoteFlow</h1>
        </div>
        <h2 className="mb-2 text-center text-3xl font-extrabold text-slate-700">
          Masuk Akun
        </h2>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
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
          <label htmlFor="email" className="text-sm text-slate-500">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="mb-4 w-96 rounded-lg bg-slate-200 px-4 py-2 outline-2 outline-transparent transition-[outline] duration-300 hover:outline-slate-300 focus:outline-[#007afc]"
            value={formData.password}
            onChange={handleChange}
          />
          <Button variant="primary" disabled={isLoading}>
            {isLoading ? "Loading..." : "Masuk"}
          </Button>
        </form>
        <p className="text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
