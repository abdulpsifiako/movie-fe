// pages/movies/index.js
import { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from '../../services/api';
import Link from 'next/link';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(id);
        fetchMovies();
      } catch (error) {
        console.error('Failed to delete movie:', error);
      }
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Movie List</h1>
        
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title or director..."
            className="px-4 py-2 w-full max-w-md border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end mb-4">
          <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/movies/create">
            Add Movie
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-md p-6">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">Director</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">Genres</th>
                <th className="border border-gray-300 px-4 py-2 text-center text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{movie.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{movie.director}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* Check if genres exist and extract the name property */}
                    {movie.genres && movie.genres.length > 0
                      ? movie.genres.map((genre, index) => (
                          <span key={index}>
                            {genre.name} {index < movie.genres.length - 1 && ', '}
                          </span>
                        ))
                      : 'No genres available'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" href={`/movies/${movie.id}`}>
                        View
                      </Link>
                      <Link className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" href={`/movies/edit/${movie.id}`}>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMovies.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No movies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
