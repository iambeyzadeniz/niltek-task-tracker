import { useState, useMemo, useCallback } from "react";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CompleteIcon,
  RadioButtonUnchecked as UncompleteIcon,
  MoreVert as MoreIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useTaskContext } from "../../contexts/TaskContext";
import { statusTheme } from "../../styles/theme";
import LoadingSpinner from "../Loading/LoadingSpinner";

const TaskGrid = () => {
  const {
    tasks,
    isLoading,
    selectedTasks,
    setSelectedTasks,
    updateTaskTitle,
    toggleTaskComplete,
    deleteTask,
  } = useTaskContext();

  const [rowModesModel, setRowModesModel] = useState({});
  const [loadingRows, setLoadingRows] = useState({});

  const [contextMenu, setContextMenu] = useState(null);
  const [contextMenuTask, setContextMenuTask] = useState(null);

  const calculatePerfectHeight = useCallback(
    (pageSize = 5) => {
      const HEADER_HEIGHT = 56; // Column headers
      const ROW_HEIGHT = 52; // Her bir row
      const PAGINATION_HEIGHT = 52; // Alt pagination bar
      const BORDER_HEIGHT = 2; // Üst ve alt border

      // Gerçek satır sayısını hesapla
      const actualRowCount = Math.min(tasks.length, pageSize);

      // Total height calculation
      const calculatedHeight =
        HEADER_HEIGHT +
        ROW_HEIGHT * actualRowCount +
        PAGINATION_HEIGHT +
        BORDER_HEIGHT;

      return calculatedHeight;
    },
    [tasks.length]
  );

  const [currentPageSize, setCurrentPageSize] = useState(5);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const handleContextMenuClose = useCallback(() => {
    setContextMenu(null);
    setContextMenuTask(null);
  }, []);

  const handleSaveClick = useCallback((id) => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View },
    }));
  }, []);

  const handleCancelClick = useCallback((id) => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  }, []);
  // Helper functions ekleyin
  const setRowLoading = useCallback((rowId, isLoading) => {
    setLoadingRows((prev) => {
      if (isLoading) {
        return { ...prev, [rowId]: true };
      } else {
        const newState = { ...prev };
        delete newState[rowId];
        return newState;
      }
    });
  }, []);

  const isRowLoading = useCallback(
    (rowId) => {
      return !!loadingRows[rowId];
    },
    [loadingRows]
  );

  const handleToggleComplete = useCallback(
    async (task) => {
      try {
        setRowLoading(task.id, true);

        await toggleTaskComplete(task);
        handleContextMenuClose();

        setRowLoading(task.id, false);
      } catch (error) {
        console.error("Error toggling task:", error);
        setRowLoading(task.id, false);
      }
    },
    [toggleTaskComplete, handleContextMenuClose, setRowLoading]
  );

  const handleDeleteTask = useCallback(
    async (task) => {
      try {
        setRowLoading(task.id, true);

        await deleteTask(task.id);
        handleContextMenuClose();
      } catch (error) {
        console.error("Error deleting task:", error);
        setRowLoading(task.id, false);
      }
    },
    [deleteTask, handleContextMenuClose, setRowLoading]
  );

  const processRowUpdate = useCallback(
    async (newRow) => {
      try {
        setRowLoading(newRow.id, true);

        await new Promise((resolve) => setTimeout(resolve, 100));
        const updatedTask = await updateTaskTitle(newRow.id, newRow.title);

        setRowLoading(newRow.id, false);

        return updatedTask;
      } catch (error) {
        setRowLoading(newRow.id, false);
        console.error("Error updating row:", error);
        throw error;
      }
    },
    [updateTaskTitle, setRowLoading]
  );

  const handleRowEditStart = useCallback(
    (params) => {
      if (isRowLoading(params.id)) {
        return;
      }

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [params.id]: { mode: GridRowModes.Edit },
      }));
    },
    [isRowLoading]
  );

  const handleRowEditStop = useCallback(
    (params) => {
      if (isRowLoading(params.id)) {
        return;
      }

      if (params.reason === "rowFocusOut") {
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [params.id]: { mode: GridRowModes.View },
        }));
      }
    },
    [isRowLoading]
  );

  const handleEditClick = useCallback(
    (id) => {
      if (isRowLoading(id)) {
        return;
      }

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit },
      }));
    },
    [isRowLoading]
  );

  const handleContextMenu = useCallback((event, task) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
    setContextMenuTask(task);
  }, []);

  const handlePaginationChange = useCallback((newModel) => {
    if (newModel.pageSize === -1) {
      setPaginationModel(newModel);
      setCurrentPageSize(1000);
    } else {
      setPaginationModel(newModel);
      setCurrentPageSize(newModel.pageSize);
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "Görev Başlığı",
        flex: 1,
        minWidth: 250,
        editable: (params) => !isRowLoading(params.id),
        renderCell: (params) => {
          const isLoading = isRowLoading(params.row.id);

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                height: "100%",
                width: "100%",
                opacity: isLoading ? 0.6 : 1,
                pointerEvents: isLoading ? "none" : "auto",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  textDecoration: params.row.isCompleted
                    ? "line-through"
                    : "none",
                  color: params.row.isCompleted
                    ? "text.secondary"
                    : "text.primary",
                  fontWeight: params.row.isCompleted ? 400 : 500,
                  flex: 1,
                }}
              >
                {params.value}
              </Typography>

              {isLoading && (
                <CircularProgress
                  size={16}
                  thickness={4}
                  sx={{ color: "primary.main" }}
                />
              )}
            </Box>
          );
        },
      },

      {
        field: "description",
        headerName: "Açıklama",
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
          <Tooltip title={params.value || "Açıklama yok"} arrow>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                height: "100%",
                display: "flex",
                alignItems: "center",
                textDecoration: params.row.isCompleted
                  ? "line-through"
                  : "none",
                opacity: isRowLoading(params.row.id) ? 0.6 : 1,
              }}
            >
              {params.value || "-"}
            </Typography>
          </Tooltip>
        ),
      },

      {
        field: "isCompleted",
        headerName: "Durum",
        width: 150,
        renderCell: (params) => {
          const isCompleted = params.value;
          const isLoading = isRowLoading(params.row.id);
          const theme = isCompleted
            ? statusTheme.completed
            : statusTheme.pending;

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                gap: 1,
              }}
            >
              <Chip
                label={isCompleted ? "Tamamlandı" : "Devam Ediyor"}
                size="small"
                icon={isCompleted ? <CompleteIcon /> : <UncompleteIcon />}
                sx={{
                  color: theme.color,
                  backgroundColor: theme.backgroundColor,
                  fontWeight: 500,
                  opacity: isLoading ? 0.6 : 1,
                  textDecoration: params.row.isCompleted
                    ? "line-through"
                    : "none",
                  "& .MuiChip-label": {
                    textDecoration: params.row.isCompleted
                      ? "line-through"
                      : "none",
                  },
                }}
              />

              {isLoading && (
                <CircularProgress
                  size={16}
                  thickness={4}
                  sx={{ color: "primary.main" }}
                />
              )}
            </Box>
          );
        },
      },

      {
        field: "actions",
        type: "actions",
        headerName: "İşlemler",
        width: 120,
        cellClassName: "actions",
        getActions: ({ id, row }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          const isCompleted = row.isCompleted;
          const isLoading = isRowLoading(id);

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Kaydet"
                sx={{
                  color: "primary.main",
                  textDecoration: isCompleted ? "line-through" : "none",
                  opacity: isLoading ? 0.5 : 1,
                }}
                onClick={() => handleSaveClick(id)}
                disabled={isLoading}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="İptal"
                className="textPrimary"
                onClick={() => handleCancelClick(id)}
                sx={{
                  textDecoration: isCompleted ? "line-through" : "none",
                  opacity: isLoading ? 0.5 : 1,
                }}
                color="inherit"
                disabled={isLoading}
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Düzenle"
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              sx={{
                textDecoration: isCompleted ? "line-through" : "none",
                opacity: isLoading ? 0.5 : 1,
              }}
              color="inherit"
              disabled={isLoading}
            />,
            <IconButton
              size="small"
              onClick={(event) => handleContextMenu(event, row)}
              disabled={isLoading}
              sx={{
                textDecoration: isCompleted ? "line-through" : "none",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              <MoreIcon fontSize="small" />
            </IconButton>,
          ];
        },
      },
    ],
    [
      loadingRows,
      isRowLoading,
      rowModesModel,
      handleEditClick,
      handleSaveClick,
      handleCancelClick,
      handleContextMenu,
    ]
  );

  const getRowClassName = useCallback((params) => {
    const classes = [];
    if (params.row.isCompleted) {
      classes.push("task-completed");
    }
    return classes.join(" ");
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Görevler yükleniyor..." />;
  }

  const perfectHeight = calculatePerfectHeight(currentPageSize);

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        key={JSON.stringify(loadingRows)}
        rows={tasks}
        columns={columns}
        paginationModel={paginationModel}
        pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
        pagination
        editMode="row"
        rowModesModel={rowModesModel}
        isCellEditable={(params) => !isRowLoading(params.id)}
        onRowModesModelChange={setRowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) =>
          console.error("Row update error:", error)
        }
        onSelectionModelChange={(newSelection) =>
          setSelectedTasks(newSelection)
        }
        selectionModel={selectedTasks}
        getRowClassName={getRowClassName}
        onPaginationModelChange={handlePaginationChange}
        sx={{
          height: `${perfectHeight}px`, // DİNAMİK YÜKSEKLİK - SADECE BU DEĞİŞTİ
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "action.hover",
          },
          "& .MuiDataGrid-cell--editable": {
            "&:hover": {
              backgroundColor: "action.selected",
            },
          },
          // Tamamlanan görevler için global çizgi stili - EKLENDİ
          "& .task-completed": {
            "& .MuiDataGrid-cell": {
              textDecoration: "line-through !important",
            },
            "& .MuiChip-label": {
              textDecoration: "line-through !important",
            },
            "& svg": {
              // Icon'lar için
              textDecoration: "line-through",
            },
          },
        }}
      />

      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {contextMenuTask
          ? [
              <MenuItem
                key="toggle"
                onClick={() => handleToggleComplete(contextMenuTask)}
                disabled={isRowLoading(contextMenuTask.id)}
              >
                <ListItemIcon>
                  {contextMenuTask.isCompleted ? (
                    <UncompleteIcon fontSize="small" />
                  ) : (
                    <CompleteIcon fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText>
                  {contextMenuTask.isCompleted
                    ? "Tamamlanmadı İşaretle"
                    : "Tamamlandı İşaretle"}
                </ListItemText>
              </MenuItem>,
              <MenuItem
                key="delete"
                onClick={() => handleDeleteTask(contextMenuTask)}
                sx={{ color: "error.main" }}
                disabled={isRowLoading(contextMenuTask.id)}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Sil</ListItemText>
              </MenuItem>,
            ]
          : null}
      </Menu>
    </Box>
  );
};

export default TaskGrid;
