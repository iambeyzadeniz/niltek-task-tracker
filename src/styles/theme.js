import { createTheme } from "@mui/material/styles";

// Custom theme configuration
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e",
      light: "#f73378",
      dark: "#9a0036",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    error: {
      main: "#f44336",
      light: "#ef5350",
      dark: "#d32f2f",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
    },
    button: {
      textTransform: "none", // Buttons without uppercase
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    // MuiButton customizations
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    // MuiPaper customizations
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        elevation2: {
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        },
        elevation3: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
    // DataGrid customizations
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: 8,
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f0f0f0",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#fafafa",
            borderBottom: "2px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeader": {
            fontWeight: 600,
          },
          // Completed task styling
          "& .task-completed": {
            backgroundColor: "#f1f8e9",
            "&:hover": {
              backgroundColor: "#e8f5e8",
            },
            "& .MuiDataGrid-cell": {
              color: "#4caf50",
            },
          },
        },
      },
    },
    // Modal customizations
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          padding: "8px",
        },
      },
    },
    // TextField customizations
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    // Chip customizations
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    // Tooltip customizations
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          fontSize: "0.75rem",
          borderRadius: 4,
        },
      },
    },
  },
});

// Task priority theme colors
export const priorityTheme = {
  critical: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.light + "20",
  },
  high: {
    color: "#ff5722",
    backgroundColor: "#ff572220",
  },
  medium: {
    color: theme.palette.warning.main,
    backgroundColor: theme.palette.warning.light + "20",
  },
  low: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light + "20",
  },
};

// Task status theme colors
export const statusTheme = {
  completed: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light + "20",
  },
  pending: {
    color: theme.palette.warning.main,
    backgroundColor: theme.palette.warning.light + "20",
  },
};

export default theme;
