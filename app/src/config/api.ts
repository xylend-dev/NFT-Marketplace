const isBackendEnabled = process.env.REACT_APP_IS_BACKEND_ENABLED === "true";
const endpoint = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export { isBackendEnabled, endpoint };
