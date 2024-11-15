// pages/movies/edit/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMovieById, updateMovie, getGenres } from '../../../services/api';

export default function EditMovie() {
  const router = useRouter();
  const { id } = router.query;
  
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (id) {
      fetchMovie();
      fetchGenres();
    }
  }, [id]);

  const fetchMovie = async () => {
    const response = await getMovieById(id);
    const movie = response.data.data[0];
    setTitle(movie.title);
    setSummary(movie.summary);
    setDirector(movie.director);
    setSelectedGenres(movie.genres.map(genre => genre.id));
  };

  const fetchGenres = async () => {
    const response = await getGenres();
    setGenres(response.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMovie(id, { title, summary, director, idGenres: selectedGenres });
    router.push('/movies');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="summary" className="block text-lg font-medium text-gray-700">Summary</label>
            <textarea
              id="summary"
              placeholder="Enter movie summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div>
            <label htmlFor="director" className="block text-lg font-medium text-gray-700">Director</label>
            <input
              id="director"
              type="text"
              placeholder="Enter director's name"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="genres" className="block text-lg font-medium text-gray-700">Genres</label>
            <select
              id="genres"
              multiple
              value={selectedGenres}
              onChange={(e) => setSelectedGenres([...e.target.selectedOptions].map(option => option.value))}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
