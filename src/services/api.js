// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';  // Ganti dengan URL backend API Anda

export const getMovies = () => axios.get(`${API_URL}/movie`);
export const getMovieById = (id) => axios.get(`${API_URL}/movie/${id}`);
export const createMovie = (movie) => axios.post(`${API_URL}/movie`, movie);
export const updateMovie = (id, movie) => axios.put(`${API_URL}/movie/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${API_URL}/movie/${id}`);

export const searchMovies = (title) => axios.get(`${API_URL}/movie/search`, { params: { title } });  // Menambahkan fungsi pencarian
export const getGenres = () => axios.get(`${API_URL}/genre`);
export const getGenreById = (id) => axios.get(`${API_URL}/genre/${id}`);
export const createGenre = (genre) => axios.post(`${API_URL}/genre`, genre);
export const updateGenre = (id, genre) => axios.put(`${API_URL}/genre/${id}`, genre);
export const deleteGenre = (id) => axios.delete(`${API_URL}/genre/${id}`);
