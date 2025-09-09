function FeaturedGadgets({ category, priceRange }) {
  try {
    const [featuredProducts, setFeaturedProducts] = React.useState([]);

    React.useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await API.getProducts({ 
            category: category === 'all' ? undefined : category,
            limit: 20 
          });
          
          if (response.success) {
            const filtered = response.products.filter(product => 
              product.price >= priceRange[0] && product.price <= priceRange[1]
            ).slice(0, 4);
            setFeaturedProducts(filtered);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }, [category, priceRange]);

    return (
      <section className="py-16 bg-white" data-name="featured-gadgets" data-file="components/FeaturedGadgets.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Featured Gadgets</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Hand-picked for the best value and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product._id} className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <span className="absolute top-2 left-2 bg-[var(--accent-color)] text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{product.name}</h3>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-2">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">{product.rating}</span>
                </div>

                <div className="text-2xl font-bold text-[var(--primary-color)] mb-4">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                <button className="btn-primary w-full text-sm">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('FeaturedGadgets component error:', error);
    return null;
  }
}