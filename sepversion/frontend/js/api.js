// API utility for communicating with MongoDB backend
const API = {
  baseURL: window.location.origin + '/api',

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      };

      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
      }

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  async getProducts(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/products?${searchParams}`);
  },

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: productData,
    });
  },

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }
};

// MongoDB API integration
window.trickleListObjects = async (objectType, limit = 20) => {
  try {
    if (objectType === 'products') {
      const response = await API.getProducts({ limit });
      return {
        items: response.products.map(product => ({
          objectId: product._id,
          objectData: product,
        })),
        nextPageToken: null,
      };
    }
    return { items: [], nextPageToken: null };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { items: [], nextPageToken: null };
  }
};

window.trickleCreateObject = async (objectType, objectData) => {
  try {
    if (objectType === 'products') {
      const response = await API.createProduct(objectData);
      return { objectId: response.product._id, objectData: response.product };
    }
    return null;
  } catch (error) {
    console.error('Error creating object:', error);
    return null;
  }
};

window.API = API;