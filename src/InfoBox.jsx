import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const HOT_URL = "https://images.unsplash.com/photo-1565677913671-ce5a5c0ae655?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600";
  const COLD_URL = "https://images.unsplash.com/photo-1674407866481-a39b2239f771?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600";
  const RAINY = "https://media.istockphoto.com/id/498063665/photo/rainy-landscape.webp?a=1&b=1&s=612x612&w=0&k=20&c=hOE6L7f7OoSKUW1Q4tR27GoEkOU_ywKJGCvSO77SeZg=";

  const getWeatherCondition = () => {
    if (info.humidity > 80) return { text: '🌧️ Rainy', color: '#2196F3', bgColor: '#E3F2FD', borderColor: '#64B5F6' };
    if (info.temp > 15) return { text: '☀️ Hot', color: '#FF6B6B', bgColor: '#FFEBEE', borderColor: '#EF5350' };
    return { text: '❄️ Cold', color: '#5DADE2', bgColor: '#E1F5FE', borderColor: '#4FC3F7' };
  };

  const weatherCondition = getWeatherCondition();
  const imageUrl = info.humidity > 80 ? RAINY : info.temp > 15 ? HOT_URL : COLD_URL;

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          overflow: "hidden",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
          },
        }}
      >
        {/* Image Header Section */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="260"
            image={imageUrl}
            alt="weather"
            sx={{ 
              filter: "brightness(0.75)",
              objectFit: "cover"
            }}
          />
          
          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          {/* Temperature Badge */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255,255,255,0.95)",
              borderRadius: 3,
              padding: "12px 20px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: weatherCondition.color,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              🌡️ {info.temp}°C
            </Typography>
          </Box>

          {/* City Name and Condition */}
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "white",
                mb: 1,
                textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {info.city}
            </Typography>
            <Chip
              label={weatherCondition.text}
              sx={{
                backgroundColor: "rgba(255,255,255,0.9)",
                color: weatherCondition.color,
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "20px 8px",
                backdropFilter: "blur(10px)",
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ padding: { xs: 3, sm: 4 } }}>
          {/* Main Stats Grid */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Box
                sx={{
                  backgroundColor: "#FFF3E0",
                  borderRadius: 2,
                  padding: 2.5,
                  textAlign: "center",
                  border: "2px solid #FFB74D",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(255,152,0,0.2)",
                  },
                }}
              >
                <Typography variant="h4" sx={{ mb: 0.5 }}>🌡️</Typography>
                <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: 600 }}>
                  Feels Like
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FF9800", mt: 1 }}>
                  {info.feels_like}°C
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Box
                sx={{
                  backgroundColor: "#E3F2FD",
                  borderRadius: 2,
                  padding: 2.5,
                  textAlign: "center",
                  border: "2px solid #64B5F6",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(33,150,243,0.2)",
                  },
                }}
              >
                <Typography variant="h4" sx={{ mb: 0.5 }}>💧</Typography>
                <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: 600 }}>
                  Humidity
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2196F3", mt: 1 }}>
                  {info.humidity}%
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Box
                sx={{
                  backgroundColor: "#FCE4EC",
                  borderRadius: 2,
                  padding: 2.5,
                  textAlign: "center",
                  border: "2px solid #F48FB1",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(233,30,99,0.2)",
                  },
                }}
              >
                <Typography variant="h4" sx={{ mb: 0.5 }}>🔽</Typography>
                <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: 600 }}>
                  Min Temp
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#E91E63", mt: 1 }}>
                  {info.tempMin}°C
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Box
                sx={{
                  backgroundColor: "#FFEBEE",
                  borderRadius: 2,
                  padding: 2.5,
                  textAlign: "center",
                  border: "2px solid #EF5350",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(244,67,54,0.2)",
                  },
                }}
              >
                <Typography variant="h4" sx={{ mb: 0.5 }}>🔼</Typography>
                <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: 600 }}>
                  Max Temp
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#F44336", mt: 1 }}>
                  {info.tempMax}°C
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Additional Details Grid */}
          <Grid container spacing={2}>
            {info.windSpeed && (
              <Grid item xs={6} sm={4}>
                <Box
                  sx={{
                    backgroundColor: "#F3E5F5",
                    borderRadius: 2,
                    padding: 2.5,
                    textAlign: "center",
                    border: "2px solid #BA68C8",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 16px rgba(156,39,176,0.2)",
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 0.5 }}>💨</Typography>
                  <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: 600 }}>
                    Wind Speed
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#9C27B0", mt: 1 }}>
                    {info.windSpeed} m/s
                  </Typography>
                </Box>
              </Grid>
            )}

            {info.pressure && (
              <Grid item xs={6} sm={4}>
                <Box
                  sx={{
                    backgroundColor: "#E8F5E9",
                    borderRadius: 2,
                    padding: 2.5,
                    textAlign: "center",
                    border: "2px solid #81C784",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 16px rgba(76,175,80,0.2)",
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 0.5 }}>📊</Typography>
                  <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: 600 }}>
                    Pressure
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4CAF50", mt: 1 }}>
                    {info.pressure} hPa
                  </Typography>
                </Box>
              </Grid>
            )}

            {info.visibility && (
              <Grid item xs={6} sm={4}>
                <Box
                  sx={{
                    backgroundColor: "#FFF9C4",
                    borderRadius: 2,
                    padding: 2.5,
                    textAlign: "center",
                    border: "2px solid #FFF176",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 16px rgba(255,235,59,0.2)",
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 0.5 }}>👁️</Typography>
                  <Typography variant="caption" sx={{ color: "#666", display: "block", fontWeight: 600 }}>
                    Visibility
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#F57F17", mt: 1 }}>
                    {info.visibility} km
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Footer */}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "2px solid #f0f0f0",
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#999", fontWeight: 500 }}>
              🕐 Last updated: {new Date().toLocaleTimeString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}