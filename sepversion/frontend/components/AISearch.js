function AISearch({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, priceRange, setPriceRange }) {
  try {
    const [searchResults, setSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const categories = [
      { id: 'all', name: 'All Categories', icon: 'grid-3x3' },
      { id: 'smartphones', name: 'Smartphones', icon: 'smartphone' },
      { id: 'laptops', name: 'Laptops', icon: 'laptop' },
      { id: 'headphones', name: 'Headphones', icon: 'headphones' },
      { id: 'tablets', name: 'Tablets', icon: 'tablet' },
      { id: 'smartwatch', name: 'Smartwatches', icon: 'watch' }
    ];

    const performAISearch = async () => {
      if (!searchQuery.trim()) return;
      
      setIsLoading(true);
      try {
        // Simulate AI search with realistic delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockResults = [
          {
            id: 1,
            name: "iPhone 15 Pro",
            category: "smartphones",
            price: 134900,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
            features: ["A17 Pro chip", "48MP camera", "Titanium design"],
            affiliate_link: "#"
          },
          {
            id: 2,
            name: "MacBook Air M2",
            category: "laptops", 
            price: 114900,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300",
            features: ["M2 chip", "18-hour battery", "Retina display"],
            affiliate_link: "#"
          }
        ];
        
        const filteredResults = mockResults.filter(product => {
          const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
          const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
          return categoryMatch && priceMatch;
        });
        
        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    React.useEffect(() => {
      if (searchQuery) {
        performAISearch();
      }
    }, [searchQuery, selectedCategory, priceRange]);

    return (
      <section id="ai-search" className="py-16 bg-gray-50" data-name="ai-search" data-file="components/AISearch.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Smart Search & Filtering</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our AI analyzes your requirements and finds the perfect match
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-lg border transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]'
                      : 'bg-white text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--primary-color)]'
                  }`}
                >
                  <div className={`icon-${category.icon} text-lg mr-2`}></div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
              <p className="text-[var(--text-secondary)]">AI is analyzing your request...</p>
            </div>
          )}

          {searchResults.length > 0 && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(product => (
                <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {'★'.repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{product.rating}</span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--primary-color)] mb-3">₹{product.price.toLocaleString('en-IN')}</p>
                  <button className="btn-primary w-full">View Details</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('AISearch component error:', error);
    return null;
  }
}