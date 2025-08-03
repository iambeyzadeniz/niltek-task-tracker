import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Assignment as TaskIcon,
  Refresh as RefreshIcon,
  CheckCircle as CompletedIcon,
  PendingActions as PendingIcon,
} from "@mui/icons-material";
import { useTaskContext } from "../../contexts/TaskContext";

const Header = () => {
  const { totalTasks, completedTasks, pendingTasks, fetchTasks, isLoading } =
    useTaskContext();

  const handleRefresh = () => {
    fetchTasks();
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 1,
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <img
          src="/niltek.png"
          alt="Niltek Logo"
          style={{ width: "6rem", height: "2rem" }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Görev Takip Sistemi
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mr: 2, mt: 1.2 }}>
          <Tooltip title="Toplam Görev">
            <Badge badgeContent={totalTasks} color="primary">
              <TaskIcon color="action" />
            </Badge>
          </Tooltip>

          <Tooltip title="Tamamlanan Görevler">
            <Badge badgeContent={completedTasks.length} color="success">
              <CompletedIcon color="success" />
            </Badge>
          </Tooltip>

          <Tooltip title="Bekleyen Görevler">
            <Badge badgeContent={pendingTasks.length} color="warning">
              <PendingIcon color="warning" />
            </Badge>
          </Tooltip>
        </Box>

        <Tooltip title="Yenile">
          <span>
            <IconButton
              onClick={handleRefresh}
              disabled={isLoading}
              sx={{
                color: "text.primary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <RefreshIcon
                sx={{
                  animation: isLoading ? "spin 1s linear infinite" : "none",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
