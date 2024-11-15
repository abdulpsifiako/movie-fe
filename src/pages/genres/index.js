// pages/genres/index.js
import { useEffect, useState } from 'react';
import { getGenres, deleteGenre } from '../../services/api';
import Link from 'next/link';

export default function GenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await getGenres();
      setGenres(response.data.data);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this genre?')) {
      try {
        await deleteGenre(id);
        fetchGenres();
      } catch (error) {
        console.error('Failed to delete genre:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Genre List</h1>
        
        {/* Add Genre Button */}
        <div className="flex justify-end mb-6">
          <Link
            href="/genres/create"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Genre
          </Link>
        </div>

        {/* Genre List */}
        <div className="bg-white shadow-md rounded-md p-6">
          <ul className="space-y-4">
            {genres.map((genre) => (
              <li key={genre.id} className="flex justify-between items-center p-4 border-b border-gray-300">
                <span className="text-gray-800 font-semibold">{genre.name}</span>
                <div className="flex space-x-2">
                  <Link
                    href={`/genres/edit/${genre.id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(genre.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {genres.length === 0 && (
              <li className="text-center text-gray-500 py-4">No genres found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
