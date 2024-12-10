import axios from "axios";

// Base URL for your backend API
const API_BASE_URL = "http://localhost:5000/api";

// Axios instance for default configurations
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token in headers (if available)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Exported API functions

/**
 * Login user
 * @param {Object} credentials - User credentials (username and password)
 * @returns {Promise} API response
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Register user
 * @param {Object} userData - User registration details
 * @returns {Promise} API response
 */
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Fetch quiz data
 * @returns {Promise} API response
 */
export const fetchQuiz = async () => {
  try {
    const response = await apiClient.get("/quiz");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Submit quiz answers
 * @param {Object} answers - User's answers
 * @returns {Promise} API response
 */
export const submitQuiz = async (answers) => {
  try {
    const response = await apiClient.post("/quiz/submit", answers);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiClient;
