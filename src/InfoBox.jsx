import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

export default function InfoBox({ info }) {
  const HOT_URL = "https://images.unsplash.com/photo-1565677913671-ce5a5c0ae655?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600";
  const COLD_URL = "https://images.unsplash.com/photo-1674407866481-a39b2239f771?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600";
  const RAINY = "https://media.istockphoto.com/id/498063665/photo/rainy-landscape.webp?a=1&b=1&s=612x612&w=0&k=20&c=hOE6L7f7OoSKUW1Q4tR27GoEkOU_ywKJGCvSO77SeZg=";

  const getWeatherCondition = () => {
    if (info.humidity > 80) return { text: 'Rainy', icon: '🌧️', color: '#3b82f6', bgColor: '#eff6ff' };
    if (info.temp > 15) return { text: 'Hot', icon: '☀️', color: '#f97316', bgColor: '#fff7ed' };
    return { text: 'Cold', icon: '❄️', color: '#06b6d4', bgColor: '#ecfeff' };
  };

  const weatherCondition = getWeatherCondition();
  const imageUrl = info.humidity > 80 ? RAINY : info.temp > 15 ? HOT_URL : COLD_URL;

  const StatCard = ({ icon, label, value, color, bgColor }) => (
    <Box
      sx={{
        backgroundColor: bgColor,
        borderRadius: 2,
        padding: { xs: 1.5, sm: 2, md: 2.5 },
        textAlign: "center",
        border: "1px solid",
        borderColor: `${color}20`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          mb: { xs: 0.5, sm: 1 },
          fontSize: { xs: "1.5rem", sm: "2rem" }
        }}
      >
        {icon}
      </Typography>
      <Typography 
        variant="caption" 
        sx={{ 
          color: "#64748b", 
          display: "block", 
          fontWeight: 600,
          fontSize: { xs: "0.65rem", sm: "0.75rem" },
          mb: { xs: 0.5, sm: 1 }
        }}
      >
        {label}
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700, 
          color: color,
          fontSize: { xs: "0.95rem", sm: "1.15rem", md: "1.25rem" }
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 0, sm: 2 },
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          width: "100%",
          borderRadius: { xs: 2, sm: 3 },
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Image Header Section */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="auto"
            image={imageUrl}
            alt="weather"
            sx={{ 
              filter: "brightness(0.8)",
              objectFit: "cover",
              height: { xs: 180, sm: 220, md: 260 }
            }}
          />
          
          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Temperature Badge */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: 12, sm: 16, md: 20 },
              right: { xs: 12, sm: 16, md: 20 },
              background: "rgba(255,255,255,0.98)",
              borderRadius: 2,
              padding: { xs: "8px 12px", sm: "10px 16px", md: "12px 20px" },
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: weatherCondition.color,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" }
              }}
            >
              🌡️ {info.temp}°C
            </Typography>
          </Box>

          {/* City Name and Condition */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 12, sm: 16, md: 20 },
              left: { xs: 12, sm: 16, md: 20 },
              right: { xs: 12, sm: 16, md: 20 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 1,
                textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }
              }}
            >
              {info.city}
            </Typography>
            <Chip
              label={`${weatherCondition.icon} ${weatherCondition.text}`}
              sx={{
                backgroundColor: "rgba(255,255,255,0.95)",
                color: weatherCondition.color,
                fontWeight: 700,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                padding: { xs: "16px 6px", sm: "18px 8px", md: "20px 8px" },
                backdropFilter: "blur(10px)",
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
          {/* Main Stats Grid */}
          <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 3 } }}>
            <Grid item xs={6} sm={6} md={3}>
              <StatCard
                icon="🌡️"
                label="Feels Like"
                value={`${info.feels_like}°C`}
                color="#f97316"
                bgColor="#fff7ed"
              />
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <StatCard
                icon="💧"
                label="Humidity"
                value={`${info.humidity}%`}
                color="#3b82f6"
                bgColor="#eff6ff"
              />
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <StatCard
                icon="🔽"
                label="Min Temp"
                value={`${info.tempMin}°C`}
                color="#8b5cf6"
                bgColor="#f5f3ff"
              />
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <StatCard
                icon="🔼"
                label="Max Temp"
                value={`${info.tempMax}°C`}
                color="#ef4444"
                bgColor="#fef2f2"
              />
            </Grid>
          </Grid>

          {/* Additional Details Grid */}
          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {info.windSpeed && (
              <Grid item xs={12} sm={4}>
                <StatCard
                  icon="💨"
                  label="Wind Speed"
                  value={`${info.windSpeed} m/s`}
                  color="#10b981"
                  bgColor="#f0fdf4"
                />
              </Grid>
            )}

            {info.pressure && (
              <Grid item xs={12} sm={4}>
                <StatCard
                  icon="📊"
                  label="Pressure"
                  value={`${info.pressure} hPa`}
                  color="#06b6d4"
                  bgColor="#ecfeff"
                />
              </Grid>
            )}

            {info.visibility && (
              <Grid item xs={12} sm={4}>
                <StatCard
                  icon="👁️"
                  label="Visibility"
                  value={`${info.visibility} km`}
                  color="#eab308"
                  bgColor="#fefce8"
                />
              </Grid>
            )}
          </Grid>

          {/* Footer */}
          <Box
            sx={{
              mt: { xs: 2.5, sm: 3, md: 4 },
              pt: { xs: 2, sm: 2.5, md: 3 },
              borderTop: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#9ca3af", 
                fontWeight: 500,
                fontSize: { xs: "0.75rem", sm: "0.85rem" }
              }}
            >
              🕐 Last updated: {new Date().toLocaleTimeString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}