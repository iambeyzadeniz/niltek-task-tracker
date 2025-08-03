export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const TOAST_MESSAGES = {
  TASK_CREATED: "🎉 Görev başarıyla oluşturuldu!",
  TASK_UPDATED: "✅ Görev başarıyla güncellendi!",
  TASK_DELETED: "🗑️ Görev başarıyla silindi!",
  TASK_COMPLETED: "🎯 Görev tamamlandı olarak işaretlendi!",
  TASK_UNCOMPLETED: "⏳ Görev tamamlanmadı olarak işaretlendi!",

  LOADING_ERROR: "❌ Görevler yüklenirken hata oluştu",
};

export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,

  DESCRIPTION_MAX_LENGTH: 500,
};
