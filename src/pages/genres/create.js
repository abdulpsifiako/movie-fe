// pages/genres/create.js
import { useState } from 'react';
import { createGenre } from '../../services/api';
import { useRouter } from 'next/router';

export default function CreateGenre() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGenre({ name });
    router.push('/genres');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-lg bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Genre</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Genre Name</label>
            <input 
              type="text" 
              id="name"
              placeholder="Enter genre name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button 
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Genre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
