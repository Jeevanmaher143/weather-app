import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";

export default function Weather({ updateInfo }) {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "5761a19a2960dbeb163c896f7e1b5ddc";

  useEffect(() => {
    if (!searchCity) return;

    const getWeatherInfo = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `${API_URL}?q=${searchCity}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
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

        updateInfo(result);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    getWeatherInfo();
  }, [searchCity]);

  const handleSubmit = () => {
    if (!city.trim()) {
      alert("Please enter a city name!");
      return;
    }
    setSearchCity(city.trim());
    setCity("");
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    if (error) setError(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: { xs: 3, sm: 4, md: 5 },
          borderRadius: 3,
          maxWidth: 480,
          width: "100%",
          border: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 2,
              backgroundColor: "#3b82f6",
              mb: 2,
            }}
          >
            <SearchIcon sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: 1,
            }}
          >
            Weather Search
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Get real-time weather information for any city
          </Typography>
        </Box>

        {/* Search Input */}
        <Box sx={{ mb: 2 }}>
          <TextField
            id="city"
            label="City Name"
            variant="outlined"
            fullWidth
            value={city}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Mumbai, London, Tokyo"
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#3b82f6",
              },
            }}
          />
        </Box>

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          disabled={loading}
          sx={{
            padding: "12px",
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            backgroundColor: "#3b82f6",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#2563eb",
              boxShadow: "none",
            },
            "&:disabled": {
              backgroundColor: "#cbd5e1",
              color: "#ffffff",
            },
          }}
        >
          {loading ? "Searching..." : "Search Weather"}
        </Button>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 3,
              borderRadius: 2,
              border: "1px solid #fee2e2",
              backgroundColor: "#fef2f2",
              "& .MuiAlert-icon": {
                color: "#dc2626",
              },
              "& .MuiAlert-message": {
                color: "#991b1b",
              },
            }}
          >
            City not found. Please check the spelling and try again.
          </Alert>
        )}

        {/* Info Section */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#9ca3af",
              lineHeight: 1.6,
            }}
          >
            Tip: You can use country codes for more accuracy
            <br />
            (e.g., "London,UK" or "Paris,FR")
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}