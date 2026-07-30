const fs = require('fs');

let app = fs.readFileSync('fe/src/App.jsx', 'utf8');
app = app.replace(/<Header startAnimation={true} \/>\s*<([A-Za-z0-9_]+) \/>\s*<Footer \/>/g, 
  '<Header startAnimation={true} />\n              <main id="main-content">\n                <$1 />\n              </main>\n              <Footer />'
);
fs.writeFileSync('fe/src/App.jsx', app);

let home = fs.readFileSync('fe/src/pages/HomePage.jsx', 'utf8');
if (!home.includes('<main')) {
    home = home.replace(/(return\s*\(\s*<div[^>]*>)/, '$1\n      <main id="main-content">').replace(/(<Footer \/>\s*<\/div>\s*\);\s*})/, '      </main>\n      $1');
    fs.writeFileSync('fe/src/pages/HomePage.jsx', home);
}

let about = fs.readFileSync('fe/src/pages/AboutUsPage.jsx', 'utf8');
if (!about.includes('<main')) {
    about = about.replace(/(<Header[^\/]*\/>)/, '$1\n      <main id="main-content">').replace(/(<Footer \/>)/, '      </main>\n      $1');
    fs.writeFileSync('fe/src/pages/AboutUsPage.jsx', about);
}
console.log("Landmarks fixed");
