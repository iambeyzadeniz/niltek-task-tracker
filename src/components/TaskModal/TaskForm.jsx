import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import {
  taskValidationSchema,
  defaultTaskValues,
} from "../../utils/validationSchemas";

const TaskForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(taskValidationSchema),
    defaultValues: initialData || defaultTaskValues,
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      title: data.title.trim(),
      description: data.description?.trim() || "",
    };

    onSubmit(formattedData);
  };

  const handleReset = () => {
    reset(initialData || defaultTaskValues);
  };

  return (
    <Box
      sx={{ pt: 3 }}
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
      noValidate
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Görev Başlığı"
                fullWidth
                required
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="Örn: React dashboard geliştir"
                variant="outlined"
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sx={{ width: "100%" }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Açıklama"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                placeholder="Görev hakkında detaylı açıklama yazabilirsiniz..."
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sx={{ width: "100%" }}>
          <Box
            sx={{
              bgcolor: "grey.50",
              p: 1.5,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.200",
              width: "100%",
            }}
          >
            <Typography
              sx={{ width: "100%" }}
              variant="body2"
              color="text.secondary"
            >
              <strong>Önizleme:</strong>{" "}
              {watchedValues.title || "Başlık giriniz"}
              {watchedValues.description && (
                <>
                  {" "}
                  -{" "}
                  {watchedValues.description.length > 50
                    ? watchedValues.description.substring(0, 100) + "..."
                    : watchedValues.description}
                </>
              )}
            </Typography>
          </Box>
        </Grid>

        <Grid item sx={{ width: "100%" }} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              pt: 1,
              mt: 1,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              variant="outlined"
              onClick={onCancel || handleReset}
              disabled={loading}
              startIcon={<CancelIcon />}
            >
              {onCancel ? "İptal" : "Sıfırla"}
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              disabled={!isDirty || !isValid}
              startIcon={<SaveIcon />}
              loadingPosition="start"
            >
              {loading ? "Oluşturuluyor..." : "Oluştur"}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;
