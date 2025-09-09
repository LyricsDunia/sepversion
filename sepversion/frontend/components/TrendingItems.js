function TrendingItems() {
  try {
    const [trendingProducts, setTrendingProducts] = React.useState([]);

    React.useEffect(() => {
      const fetchTrending = async () => {
        try {
          const mockProducts = [
            {
              _id: '1',
              name: 'iPhone 15 Pro',
              price: 134900,
              rating: 4.8,
              image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
              trending: true
            },
            {
              _id: '2',
              name: 'Samsung Galaxy S24 Ultra',
              price: 129900,
              rating: 4.7,
              image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
              trending: true
            }
          ];
          const trending = mockProducts.filter(product => product.trending).slice(0, 5);
          setTrendingProducts(trending);
        } catch (error) {
          console.error('Error fetching trending products:', error);
        }
      };
      fetchTrending();
    }, []);

    return (
      <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50" data-name="trending-items" data-file="components/TrendingItems.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              <div className="icon-trending-up text-3xl text-red-500 mr-3 inline"></div>
              Trending Now
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">Most popular gadgets everyone is talking about</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trendingProducts.map((product, index) => (
              <div key={product._id} className="card hover:shadow-lg transition-all duration-200 relative">
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  #{index + 1}
                </div>
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-lg font-bold text-[var(--primary-color)]">₹{product.price.toLocaleString('en-IN')}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 text-xs mr-1">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">{product.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('TrendingItems component error:', error);
    return null;
  }
}