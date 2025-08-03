import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  (config) => {
    config.headers["Cache-Control"] = "no-cache";

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error.response || {};

    console.error(`API Error: ${status} ${error.config?.url}`, data);

    switch (status) {
      case 400:
        toast.error(data?.message || "Geçersiz istek");
        break;
      case 401:
        toast.error("Yetkisiz erişim");
        break;
      case 403:
        toast.error("Bu işlem için yetkiniz yok");
        break;
      case 404:
        toast.error("İstenen kaynak bulunamadı");
        break;
      case 500:
        toast.error("Sunucu hatası oluştu");
        break;
      default:
        if (error.code === "ECONNABORTED") {
          toast.error("İstek zaman aşımına uğradı");
        } else if (error.message === "Network Error") {
          toast.error("Ağ bağlantısı hatası");
        } else {
          toast.error("Bir hata oluştu");
        }
        break;
    }

    return Promise.reject(error);
  }
);

const methods = {
  get: (url, config = {}) =>
    axios.get(url, config).then((response) => response.data),

  post: (url, body, config = {}) =>
    axios.post(url, body, config).then((response) => response.data),

  put: (url, body, config = {}) =>
    axios.put(url, body, config).then((response) => response.data),

  patch: (url, body, config = {}) =>
    axios.patch(url, body, config).then((response) => response.data),

  delete: (url, config = {}) =>
    axios.delete(url, config).then((response) => response.data),
};

export default methods;
