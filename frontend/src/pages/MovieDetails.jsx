import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import Button from '../components/Button';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/movie/${id}`)
      .then(r => r.json())
      .then(setMovie)
      .catch(console.error);
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-6 py-12">

      <button onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="rounded-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {movie.title}
          </h1>

          <Rating rating={movie.vote_average} size="lg" />

          <p className="mt-4 text-text-secondary">
            {movie.overview}
          </p>

          <p className="mt-4">
            Runtime: {movie.runtime} min
          </p>

          <Button className="mt-6">
            Watch Trailer
          </Button>

        </div>

      </div>
    </div>
  );
};

export default MovieDetail;
