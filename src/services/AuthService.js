import api from "./api";

const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  createPassword: async (passwordData) => {
    const response = await api.post("/create", passwordData);
    return response.data;
  },

  viewTitle: async () => {
    const response = await api.get("/titles");
    return response.data;
  },

  viewpass: async () => {
    const response = await api.get("/pass");
    return response.data;
  },

  deletePassword: async (id) => {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  },

  updatePassword: async (id, passwordData) => {
    const response = await api.put(`/update/${id}`, passwordData);
    return response.data;
  },
};

export default authService;
