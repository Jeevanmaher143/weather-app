import Weather from './Weather';
import InfoBox from './InfoBox';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Mumbai",
    temp: 24,
    tempMin: 23,
    tempMax: 45,
    humidity: 47,
    feels_like: 25,
    weather: "cloud",
    windSpeed: 5.2,
    pressure: 1013,
    visibility: 10,
  });

  const [showInfo, setShowInfo] = useState(false);

  const updateInfo = (result) => {
    setWeatherInfo(result);
    setShowInfo(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f7fa",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: "relative", 
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            pt: { xs: 3, sm: 4, md: 6 },
            pb: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: { xs: 1, sm: 1.5 },
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem", lg: "3rem" },
            }}
          >
            ⛅ Weather App
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              fontWeight: 500,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            Get accurate weather information worldwide
          </Typography>

          {/* Feature Tags */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 1, sm: 1.5, md: 2 },
              mt: { xs: 2, sm: 3 },
              flexWrap: "wrap",
              px: { xs: 1, sm: 0 },
            }}
          >
            {["🌡️ Temperature", "💧 Humidity", "💨 Wind Speed"].map((tag) => (
              <Box
                key={tag}
                sx={{
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  padding: { xs: "6px 12px", sm: "8px 16px" },
                  borderRadius: "20px",
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  fontWeight: 600,
                  border: "1px solid #bae6fd",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Weather Search Component */}
        <Box
          sx={{
            mb: { xs: 3, sm: 4 },
          }}
        >
          <Weather updateInfo={updateInfo} />
        </Box>

        {/* Weather Info Display with Fade Animation */}
        <Fade in={showInfo} timeout={800}>
          <Box
            sx={{
              mb: { xs: 3, sm: 4, md: 5 },
            }}
          >
            <InfoBox info={weatherInfo} />
          </Box>
        </Fade>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            pb: { xs: 3, sm: 4 },
            pt: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#94a3b8",
              fontWeight: 500,
              fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.875rem" },
              px: { xs: 2, sm: 0 },
              lineHeight: { xs: 1.6, sm: 1.5 },
            }}
          >
            © 2025 G1 Maher Weather App | Real-time Weather Data
            <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
              {' '}| Powered by OpenWeather API
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}