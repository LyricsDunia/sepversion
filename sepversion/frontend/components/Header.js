function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
      <header className="bg-white shadow-sm border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gradient">GadgetFinder</h1>
              </div>
            </div>
            
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-[var(--text-primary)] hover:text-[var(--primary-color)] px-3 py-2 text-sm font-medium">
                  Home
                </a>
                <a href="#categories" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] px-3 py-2 text-sm font-medium">
                  Categories
                </a>
                <a href="#compare" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] px-3 py-2 text-sm font-medium">
                  Compare
                </a>
                <a href="#reviews" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] px-3 py-2 text-sm font-medium">
                  Reviews
                </a>
              </div>
            </nav>

            <div className="hidden md:block">
              <button className="btn-primary">
                Sign In
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
              >
                <div className="icon-menu text-xl"></div>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-[var(--border-color)]">
              <a href="#home" className="block px-3 py-2 text-base font-medium text-[var(--text-primary)]">Home</a>
              <a href="#categories" className="block px-3 py-2 text-base font-medium text-[var(--text-secondary)]">Categories</a>
              <a href="#compare" className="block px-3 py-2 text-base font-medium text-[var(--text-secondary)]">Compare</a>
              <a href="#reviews" className="block px-3 py-2 text-base font-medium text-[var(--text-secondary)]">Reviews</a>
            </div>
          </div>
        )}
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}