const apiClient = {
  // Auto-switch between local and production
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://YOUR-BACKEND.onrender.com/api",

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    };

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message =
        data?.error || `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    return data;
  },

  async getProducts(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await this.request(
      `/products${query ? `?${query}` : ""}`
    );
    return res.data; // ✅ matches backend shape
  }
};

window.apiClient = apiClient;
