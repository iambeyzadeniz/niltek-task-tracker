import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import TaskForm from "./TaskForm";
import { useTaskContext } from "../../contexts/TaskContext";

const TaskModal = ({ open, onClose }) => {
  const { createTask } = useTaskContext();
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await createTask(formData);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: isMobile ? "100vh" : "90vh",
          minWidth: {
            xs: "100%",
            sm: "400px",
            md: "600px",
          },
          width: "100%",
          margin: isMobile ? 0 : theme.spacing(2),
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          px: isMobile ? 2 : 3,
          py: isMobile ? 1.5 : 2,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="div"
          fontWeight={600}
          sx={{
            fontSize: {
              xs: "1.1rem",
              sm: "1.25rem",
              md: "1.5rem",
            },
          }}
        >
          Yeni Görev Oluştur
        </Typography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={loading}
          size={isMobile ? "small" : "medium"}
          sx={{
            color: "grey.500",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: isMobile ? 2 : 3,
          pb: isMobile ? 2 : 3,
          px: isMobile ? 2 : 3,
          // Mobilde scroll davranışı
          overflow: isMobile ? "auto" : "visible",
        }}
      >
        <TaskForm
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
