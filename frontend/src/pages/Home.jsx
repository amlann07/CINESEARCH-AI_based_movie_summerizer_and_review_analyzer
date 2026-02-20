import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Section from '../components/Section';
import MovieCard from '../components/MovieCard';

import {
  getFeaturedMovie,
  getTrendingMovies,
  getTopRatedMovies
} from '../data/mockMovies';

const Home = () => {

  // ✅ keep your original homepage content
  const featuredMovie = getFeaturedMovie();
  const trendingMovies = getTrendingMovies();
  const topRatedMovies = getTopRatedMovies();

  // ✅ search state
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // ✅ stable search handler
  const handleSearch = async (query) => {
    if (!query || loading) return;

    try {
      setLoading(true);
      setSearched(true);

      const res = await fetch(
        `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      if (!Array.isArray(data)) {
        setSearchResults([]);
        return;
      }

      // ✅ map TMDB → your MovieCard format
      const formatted = data.map(m => ({
        id: m.id,
        title: m.title,
        poster: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "",
        rating: m.vote_average ?? 0,
        year: m.release_date?.slice(0,4) || "—",
        genres: []
      }));

      setSearchResults(formatted);

    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">

      {/* ✅ hero with search */}
      <Hero movie={featuredMovie} onSearch={handleSearch} />

      <div className="max-w-container mx-auto py-16">

        {/* ✅ SEARCH RESULTS */}
        {searched && (
          <Section title="Search Results">

            {loading && (
              <p className="text-text-secondary">
                Searching...
              </p>
            )}

            {!loading && searchResults.length === 0 && (
              <p className="text-text-secondary">
                No movies found
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {searchResults.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>

          </Section>
        )}

        {/* ✅ ORIGINAL SECTIONS — unchanged */}
        <Section title="Trending Now">
          {trendingMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </Section>

        <Section title="Top Rated">
          {topRatedMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </Section>

      </div>
    </div>
  );
};

export default Home;
