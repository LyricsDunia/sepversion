function FeatureComparison() {
  try {
    const [selectedProducts, setSelectedProducts] = React.useState([]);

    React.useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await API.getProducts({ limit: 3 });
          if (response.success) {
            setSelectedProducts(response.products);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }, []);

    const getFeatureComparison = () => {
      if (selectedProducts.length === 0) return [];
      
      const features = ['processor', 'camera', 'storage', 'display'];
      return features.map(feature => ({
        feature: feature.charAt(0).toUpperCase() + feature.slice(1),
        values: selectedProducts.map(product => 
          product.specifications?.[feature] || 'N/A'
        )
      }));
    };

    return (
      <section className="py-16 bg-white" data-name="feature-comparison" data-file="components/FeatureComparison.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Feature Comparison</h2>
            <p className="text-lg text-[var(--text-secondary)]">Compare features side by side</p>
          </div>

          {selectedProducts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-[var(--border-color)]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {selectedProducts.map(product => (
                      <th key={product._id} className="text-center p-4 min-w-48">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg mx-auto mb-2" />
                        <div className="font-semibold text-sm">{product.name}</div>
                        <div className="text-[var(--primary-color)] font-bold">₹{product.price.toLocaleString('en-IN')}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getFeatureComparison().map((comparison, index) => (
                    <tr key={index} className="border-t border-[var(--border-color)]">
                      <td className="p-4 font-medium text-[var(--text-primary)]">{comparison.feature}</td>
                      {comparison.values.map((value, valueIndex) => (
                        <td key={valueIndex} className="p-4 text-center text-[var(--text-secondary)]">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('FeatureComparison component error:', error);
    return null;
  }
}