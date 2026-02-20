import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import Badge from './Badge';
import SearchBar from './SearchBar';
import { formatGenres } from '../utils/formatters';

const Hero = ({ movie, onSearch }) => {
  if (!movie) {
    return (
      <div className="relative h-[520px] flex items-center justify-center">
        <SearchBar onSearch={onSearch} className="w-full max-w-xl" />
      </div>
    );
  }

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-container mx-auto px-6 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <Badge className="mb-4">FEATURED</Badge>

          <p className="text-text-secondary mb-4">
            {movie.year} • {formatGenres(movie.genres)}
          </p>

          <h1 className="font-logo text-5xl font-bold mb-6">
            {movie.title}
          </h1>

          <p className="mb-6 line-clamp-3">
            {movie.synopsis}
          </p>

          {/* ✅ Search bar integrated nicely */}
          <div className="mb-6 max-w-lg">
            <SearchBar onSearch={onSearch} />
          </div>

          <div className="flex gap-4">
            <Button icon={Play}>Watch Trailer</Button>
            <Button variant="secondary" icon={Info}>
              More Info
            </Button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
