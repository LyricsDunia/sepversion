function BestDeals() {
  try {
    const [bestDeals, setBestDeals] = React.useState([]);

    React.useEffect(() => {
      const fetchBestDeals = async () => {
        try {
          const mockProducts = [
            {
              _id: '1',
              name: 'MacBook Air M2',
              price: 114900,
              originalPrice: 124900,
              rating: 4.6,
              image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
              bestDeal: true
            },
            {
              _id: '2',
              name: 'iPad Air',
              price: 54990,
              originalPrice: 59990,
              rating: 4.4,
              image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
              bestDeal: true
            }
          ];
          const deals = mockProducts.filter(product => product.bestDeal).slice(0, 5);
          setBestDeals(deals);
        } catch (error) {
          console.error('Error fetching best deals:', error);
        }
      };
      fetchBestDeals();
    }, []);

    return (
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50" data-name="best-deals" data-file="components/BestDeals.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              <div className="icon-zap text-3xl text-yellow-500 mr-3 inline"></div>
              Best Deals Today
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">Limited time offers you don't want to miss</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bestDeals.map(product => {
              const savings = (product.originalPrice || product.price * 1.1) - product.price;
              const discountPercent = Math.round((savings / (product.originalPrice || product.price * 1.1)) * 100);
              
              return (
                <div key={product._id} className="card hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    {discountPercent}% OFF
                  </div>
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-xl font-bold text-[var(--primary-color)]">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[var(--text-secondary)] line-through ml-2">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <button className="btn-primary w-full text-sm">
                    <div className="icon-shopping-cart mr-2 inline"></div>
                    Grab Deal Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('BestDeals component error:', error);
    return null;
  }
}