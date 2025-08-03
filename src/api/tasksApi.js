import apiClient from "./apiClient";

const tasksApi = {
  getAll: () => {
    return apiClient.get("tasks");
  },

  getById: (id) => {
    return apiClient.get(`tasks/${id}`);
  },

  create: (taskData) => {
    const newTask = {
      title: taskData.title.trim(),
      description: taskData.description?.trim() || "",
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return apiClient.post("tasks", newTask);
  },

  update: (id, taskData) => {
    const updatedTask = {
      ...taskData,
      id: Number(id),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || "",
      updatedAt: new Date().toISOString(),
    };

    return apiClient.put(`tasks/${id}`, updatedTask);
  },

  updateTitle: (id, title) => {
    if (!title || title.trim() === "") {
      throw new Error("Görev başlığı boş olamaz");
    }

    return apiClient.patch(`tasks/${id}`, {
      title: title.trim(),
      updatedAt: new Date().toISOString(),
    });
  },

  toggleComplete: async (task) => {
    return apiClient.put(`tasks/${task.id}`, {
      ...task,
      updatedAt: new Date().toISOString(),
    });
  },

  delete: (id) => {
    return apiClient.delete(`tasks/${id}`);
  },
};

export default tasksApi;
