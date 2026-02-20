import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';

const MovieCard = ({ movie, size = 'default' }) => {
  const navigate = useNavigate();

  const sizeClasses = {
    small: 'w-40',
    default: 'w-56',
    large: 'w-64',
  };

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const year = movie.release_date
    ? movie.release_date.split('-')[0]
    : '—';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${sizeClasses[size]} flex-shrink-0 cursor-pointer group`}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-card bg-card-bg shadow-card group-hover:shadow-glow transition-all duration-300">

        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Rating */}
          <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded">
            <Rating rating={movie.vote_average} size="sm" />
          </div>

          {/* Year */}
          <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded text-xs text-white">
            {year}
          </div>
        </div>

        {/* Title */}
        <div className="p-4">
          <h3 className="font-heading font-bold text-text-primary text-lg truncate">
            {movie.title}
          </h3>
        </div>

      </div>
    </motion.div>
  );
};

export default MovieCard;
