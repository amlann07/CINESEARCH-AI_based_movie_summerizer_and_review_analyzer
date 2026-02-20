// utils/formatters.js

export const formatRating = (rating) => {
  if (rating === undefined || rating === null || isNaN(rating)) {
    return "—";
  }

  return Number(rating).toFixed(1);
};

export const formatGenres = (genres = []) => {
  if (!genres.length) return "—";
  return genres.join(", ");
};

export const truncateText = (text = "", maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};
