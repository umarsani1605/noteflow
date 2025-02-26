import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import NoteDetails from './pages/NoteDetails';
// import Archive from './pages/Archive';
// import NotFound from './pages/NotFound';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<NoteDetails />} />
      {/* <Route path="/archive" element={<Archive />} /> */}
      {/* <Route path="/not-found" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);
