import React from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";

import Archive from "./pages/Archive";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="note/:id" element={<NoteDetails />} />
      <Route path="archive" element={<Archive />} />
    </Route>
  )
);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
