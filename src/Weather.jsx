import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function Weather({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "5761a19a2960dbeb163c896f7e1b5ddc";

  const getWeatherInfo = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return null;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        setError(true);
        setLoading(false);
        return null;
      }

      const jsonResponse = await response.json();

      const result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feels_like: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
        windSpeed: jsonResponse.wind.speed,
        pressure: jsonResponse.main.pressure,
        visibility: (jsonResponse.visibility / 1000).toFixed(1),
      };

      setError(false);
      setLoading(false);
      return result;
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
      return null;
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    if (error) setError(false); // Clear error when user starts typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const info = await getWeatherInfo();
    if (info) updateInfo(info);
    setCity("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Paper
        elevation={24}
        sx={{
          padding: { xs: 3, sm: 4, md: 5 },
          borderRadius: 4,
          maxWidth: 500,
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              mb: 2,
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
            }}
          >
            <SearchIcon sx={{ fontSize: 40, color: "white" }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Weather Finder
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            🌍 Discover weather conditions worldwide
          </Typography>
        </Box>

        {/* Search Form */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              id="city"
              label="Enter City Name"
              variant="outlined"
              fullWidth
              value={city}
              onChange={handleChange}
              placeholder="e.g., Mumbai, London, Tokyo"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                  "& fieldset": {
                    borderWidth: 2,
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "#667eea",
                  },
                },
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            endIcon={loading ? null : <SendIcon />}
            disabled={loading}
            sx={{
              padding: "14px",
              borderRadius: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a4193 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(102, 126, 234, 0.5)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
              "&:disabled": {
                background: "#ccc",
              },
            }}
          >
            {loading ? "Searching..." : "Get Weather"}
          </Button>
        </form>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 3,
              borderRadius: 2,
              fontWeight: 500,
              animation: "shake 0.5s",
              "@keyframes shake": {
                "0%, 100%": { transform: "translateX(0)" },
                "25%": { transform: "translateX(-10px)" },
                "75%": { transform: "translateX(10px)" },
              },
            }}
          >
            ⚠️ City not found! Please check the spelling and try again.
          </Alert>
        )}

        {/* Info Section */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "2px solid #f0f0f0",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#999",
              fontWeight: 500,
            }}
          >
            💡 Tip: Try searching for major cities or use country codes
            <br />
            (e.g., "London,UK" or "Paris,FR")
          </Typography>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🌤️
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", fontWeight: 600 }}>
              Real-time
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🌍
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", fontWeight: 600 }}>
              Worldwide
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ⚡
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", fontWeight: 600 }}>
              Instant
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}