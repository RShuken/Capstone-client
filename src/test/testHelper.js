import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

export default function RenderWithRouter({ children }) {
  return (
    <MemoryRouter>
      <Route>{children}</Route>
    </MemoryRouter>
  );
}