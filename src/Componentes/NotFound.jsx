import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Página no encontrada</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        La página que estás buscando no existe o ha sido movida.
      </p>
    </div>
  );
};