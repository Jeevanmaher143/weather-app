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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          filter: "blur(80px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-30px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          filter: "blur(80px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            pt: { xs: 4, sm: 6, md: 8 },
            pb: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "white",
              mb: 1,
              textShadow: "2px 4px 8px rgba(0,0,0,0.2)",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              animation: "fadeInDown 0.8s ease-out",
              "@keyframes fadeInDown": {
                from: {
                  opacity: 0,
                  transform: "translateY(-30px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            ⛅ Weather App
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 500,
              textShadow: "1px 2px 4px rgba(0,0,0,0.2)",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              animation: "fadeInUp 0.8s ease-out 0.2s both",
              "@keyframes fadeInUp": {
                from: {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
        
          </Typography>

          {/* Feature Tags */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 3,
              flexWrap: "wrap",
            }}
          >
            {["🌡️ Temperature", "💧 Humidity", "💨 Wind Speed"].map((tag, index) => (
              <Box
                key={tag}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "scale(0.8)" },
                    to: { opacity: 1, transform: "scale(1)" },
                  },
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
            animation: "slideUp 0.8s ease-out 0.4s both",
            "@keyframes slideUp": {
              from: {
                opacity: 0,
                transform: "translateY(40px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Weather updateInfo={updateInfo} />
        </Box>

        {/* Weather Info Display with Fade Animation */}
        <Fade in={showInfo} timeout={800}>
          <Box
            sx={{
              mt: 4,
              pb: { xs: 4, sm: 6 },
            }}
          >
            <InfoBox info={weatherInfo} />
          </Box>
        </Fade>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            pb: 4,
            pt: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 500,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            © 2025 G1 Maher  Weather App | Real-time Weather Data | Powered by OpenWeather API
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}