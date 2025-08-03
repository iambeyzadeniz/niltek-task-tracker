import { Box, CircularProgress, Typography, Backdrop } from "@mui/material";

const LoadingSpinner = ({
  size = 40,
  message = "Yükleniyor...",
  backdrop = false,
  fullScreen = false,
}) => {
  const LoadingContent = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={3}
    >
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          color: (theme) => theme.palette.primary.main,
        }}
      />
      {message && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (backdrop) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <LoadingContent />
      </Backdrop>
    );
  }

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
        zIndex={9999}
      >
        <LoadingContent />
      </Box>
    );
  }

  // Regular loading component
  return <LoadingContent />;
};

// Inline loading for small spaces
export const InlineLoader = ({ size = 20 }) => (
  <CircularProgress
    size={size}
    thickness={4}
    sx={{
      color: (theme) => theme.palette.primary.main,
      margin: 1,
    }}
  />
);

// Button loading state
export const ButtonLoader = ({ size = 16 }) => (
  <CircularProgress
    size={size}
    thickness={4}
    sx={{
      color: "inherit",
      marginRight: 1,
    }}
  />
);

// Table row loading skeleton
export const TableRowLoader = ({ columns = 4, rows = 5 }) => (
  <Box p={2}>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box key={rowIndex} display="flex" gap={2} mb={1} alignItems="center">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Box
            key={colIndex}
            height={40}
            flex={1}
            bgcolor="grey.100"
            borderRadius={1}
            sx={{
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": { opacity: 1 },
                "50%": { opacity: 0.5 },
                "100%": { opacity: 1 },
              },
            }}
          />
        ))}
      </Box>
    ))}
  </Box>
);

// Card loading skeleton
export const CardLoader = ({ height = 120 }) => (
  <Box
    height={height}
    bgcolor="grey.100"
    borderRadius={2}
    sx={{
      animation: "pulse 1.5s ease-in-out infinite",
      "@keyframes pulse": {
        "0%": { opacity: 1 },
        "50%": { opacity: 0.5 },
        "100%": { opacity: 1 },
      },
    }}
  />
);

export default LoadingSpinner;
