const apiClient = {
  baseURL: 'http://localhost:5000/api',

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { 'Content-Type': 'application/json' },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  },

  async getProducts(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/products${query ? `?${query}` : ''}`);
  }
};

window.apiClient = apiClient;
