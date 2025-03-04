import React from "react";
import { createRoot } from "react-dom/client";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";

import App from "./App";
import Archive from "./pages/Archive";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />}>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="note/:id" element={<NoteDetails />} />
        <Route path="archive" element={<Archive />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/404" element={<NotFound />} />
    </Route>,
  ),
);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
