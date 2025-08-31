import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL, // The ecommerce-backend URL
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("token");
			// Optionally redirect to login or let the component handle it
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

const API = {
	// Auth
	login: (email, password) => axiosInstance.post("/users/login", { email, password }),
	register: (userData) => axiosInstance.post("/users/register", userData),
	getMe: () => axiosInstance.get("/users/me"),
	getOrders: () => axiosInstance.get("/orders/my-orders"),
	getOrder: (id) => axiosInstance.get(`/orders/${id}`),
	getOrdersByContact: (phone) => axiosInstance.get(`/orders/contact/${phone}`),

	// Products
	getAllProducts: (params) => axiosInstance.get("/products", { params }),
	getProduct: (id) => axiosInstance.get(`/products/${id}`),

	// Categories
	getAllCategories: () => axiosInstance.get("/categories"),

	// Orders
	checkout: (cartData) => axiosInstance.post("/checkout", cartData),

	// Settings
	getSettings: () => axiosInstance.get("/settings"),
	updateSettings: (data) => axiosInstance.put("/settings", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	}),
	createContact: (data) => axiosInstance.post("/contacts", data),
};

export default API;
