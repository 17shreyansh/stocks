const fs = require('fs');
const path = 'd:/Office/Stock Broker/live/stocks/fe/src/pages/Downloads.jsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(
  '<FilterSelect className="downloads-filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>',
  '<FilterSelect aria-label="Filter by category" className="downloads-filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>'
);
content = content.replace(
  '<FilterSelect className="downloads-filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>',
  '<FilterSelect aria-label="Sort downloads" className="downloads-filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>'
);
fs.writeFileSync(path, content, 'utf8');
console.log('Replaced successfully');
