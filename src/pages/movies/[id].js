// pages/movies/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMovieById } from '../../services/api';

export default function ViewMovie() {
  const router = useRouter();
  const { id } = router.query;
  
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]);

  const fetchMovie = async () => {
    const response = await getMovieById(id);
    const fetchedMovie = response.data.data[0];
    setMovie(fetchedMovie);
  };

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-xl text-gray-700">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
          <button
            onClick={() => router.push('/movies')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Back to Movie List
          </button>
        </div>

        <div className="text-lg text-gray-700 mb-6">
          <strong className="font-semibold">Director:</strong> {movie.director}
        </div>

        <div className="text-lg text-gray-700 mb-6">
          <strong className="font-semibold">Genres:</strong> 
          {movie.genres.map((genre) => (
            <span key={genre.id} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm mr-2">{genre.name}</span>
          ))}
        </div>

        <div className="text-lg text-gray-700 mb-6">
          <strong className="font-semibold">Summary:</strong>
          <p>{movie.summary}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => router.push(`/movies/edit/${movie.id}`)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit Movie
          </button>
          <button
            onClick={() => window.confirm('Are you sure you want to delete this movie?') && deleteMovie(movie.id)}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete Movie
          </button>
        </div>
      </div>
    </div>
  );

  async function deleteMovie(movieId) {
    // Replace with actual delete movie API call
    console.log('Deleting movie:', movieId);
    // On successful deletion, redirect back to the movies list
    router.push('/movies');
  }
}
