import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ✅ load env FIRST
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ debug check (you should see your key prefix)
console.log("TMDB KEY loaded:", process.env.TMDB_KEY ? "YES" : "NO");

// --------------------------------------
// ✅ SEARCH ENDPOINT
// --------------------------------------
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim().length < 2) {
      return res.json([]);
    }

    if (!process.env.TMDB_KEY) {
      return res.status(500).json({
        error: "TMDB key not found in .env"
      });
    }

    const url =
      `https://api.themoviedb.org/3/search/movie` +
      `?api_key=${process.env.TMDB_KEY}` +
      `&query=${encodeURIComponent(query)}` +
      `&include_adult=false`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("TMDB status error:", response.status);
      return res.status(500).json({
        error: "TMDB request failed"
      });
    }

    const data = await response.json();

    // ✅ send only results array
    res.json(data.results || []);

  } catch (err) {
    console.error("Search route error:", err.message);
    res.status(500).json({
      error: "fetch failed"
    });
  }
});

// --------------------------------------
// ✅ SERVER START
// --------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
