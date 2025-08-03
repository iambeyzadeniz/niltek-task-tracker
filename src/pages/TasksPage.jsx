import { useState, useEffect } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { Add as AddIcon, Assignment as TaskIcon } from "@mui/icons-material";
import { useTaskContext } from "../contexts/TaskContext";
import PageLayout from "../components/Layout/PageLayout";
import TaskGrid from "../components/TaskGrid/TaskGrid";
import TaskModal from "../components/TaskModal/TaskModal";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

const TasksPage = () => {
  const {
    tasks,
    totalTasks,
    completedTasks,
    pendingTasks,
    fetchTasks,
    isLoading,
    hasError,
    error,
    clearError,
  } = useTaskContext();

  const [taskModalOpen, setTaskModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleOpenModal = () => {
    setTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setTaskModalOpen(false);
  };

  const pageActions = (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleOpenModal}
      size="large"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.2)",
        color: "white",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.3)",
        },
      }}
    >
      Yeni Görev
    </Button>
  );

  if (isLoading && tasks.length === 0) {
    return (
      <PageLayout showStats={false}>
        <Box sx={{ p: 4 }}>
          <LoadingSpinner message="Görevler yükleniyor..." size={60} />
        </Box>
      </PageLayout>
    );
  }

  return (
    <>
      <PageLayout
        subtitle={`${totalTasks} görev, ${completedTasks.length} tamamlandı, ${pendingTasks.length} bekliyor`}
        breadcrumbs={[
          { label: "Görevler", icon: <TaskIcon fontSize="small" /> },
        ]}
        actions={pageActions}
      >
        <Box sx={{ p: 2 }}>
          {hasError && (
            <Alert severity="error" onClose={clearError} sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Hata:</strong> {error}
              </Typography>
            </Alert>
          )}

          {!isLoading && tasks.length === 0 && !hasError && (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 4,
              }}
            >
              <TaskIcon
                sx={{
                  fontSize: 80,
                  color: "text.secondary",
                  mb: 2,
                }}
              />
              <Typography variant="h5" gutterBottom color="text.secondary">
                Henüz görev bulunmuyor
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                İlk görevinizi oluşturarak başlayın!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
                sx={{ mt: 2 }}
              >
                İlk Görevi Oluştur
              </Button>
            </Box>
          )}

          {tasks.length > 0 && (
            <Box>
              <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Toplam <strong>{totalTasks}</strong> görev bulundu
                </Typography>
                {completedTasks.length > 0 && (
                  <Typography variant="body2" color="success.main">
                    <strong>{completedTasks.length}</strong> tamamlandı
                  </Typography>
                )}
                {pendingTasks.length > 0 && (
                  <Typography variant="body2" color="warning.main">
                    <strong>{pendingTasks.length}</strong> bekliyor
                  </Typography>
                )}
              </Box>

              <TaskGrid />
            </Box>
          )}
        </Box>
      </PageLayout>

      <TaskModal open={taskModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default TasksPage;
