import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import NoteDetails from './pages/NoteDetails';
import Archive from './pages/Archive';
import NotFound from './pages/NotFound';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/note/:id"
        element={<NoteDetails />}
        loader={async ({ params }) => {
          const noteDetail = getNote(params.id);
          if (!noteDetail) {
            throw new Response('Note not found', { status: 404 });
          }
          return { noteDetail };
        }}
        errorElement={<NotFound />}
      />
      <Route path="/archive" element={<Archive />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
