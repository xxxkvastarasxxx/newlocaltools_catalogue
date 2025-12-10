# New Local Tools - Catalogue

Professional multi-page catalogue for cordless drills and drivers.

## Project Structure

```
NLT_Catalogue/
├── index.html                          # Main navigation page
├── assets/
│   ├── css/
│   │   ├── main.css                    # Styles for main navigation
│   │   ├── category.css                # Shared styles for category pages
│   │   └── styles.css                  # Legacy styles (archived)
│   ├── js/
│   │   ├── category.js                 # PDF generation and interactions
│   │   └── script.js                   # Legacy script (archived)
│   └── images/                         # Local images (if needed)
├── pages/
│   ├── impact-drivers/
│   │   └── index.html                  # Impact drivers comparison
│   ├── impact-wrenches/
│   │   └── index.html                  # Impact wrenches (coming soon)
│   ├── combi-drills/
│   │   └── index.html                  # Combi drills (coming soon)
│   ├── screwguns/
│   │   └── index.html                  # Screwguns (coming soon)
│   ├── angle-drills/
│   │   └── index.html                  # Angle drills (coming soon)
│   └── sds-hammer-drills/
│       └── index.html                  # SDS hammer drills (coming soon)
└── README.md                           # This file
```

## Features

- **Multi-page Architecture**: Clean separation between categories with dedicated pages
- **Professional Structure**: Industry-standard folder organization (assets, pages)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **PDF Export**: Download comparison tables as PDF (implemented for Impact Drivers)
- **Modular CSS**: Shared styles across category pages for consistency
- **Easy Maintenance**: Add new categories by duplicating page structure
- **Clean Navigation**: Simple, centered category selector on home page

## Getting Started

1. Open `index.html` in your browser
2. Select a category from the navigation page
3. View comparison tables for each category
4. Download tables as PDF (where available)

## Categories

1. **Cordless Impact Drivers** (20 models) - ✅ Complete with DeWalt range
2. **Cordless Impact Wrenches** (8 models) - 🔜 Coming soon
3. **Cordless Combi Drills** (20 models) - 🔜 Coming soon
4. **Cordless Screwguns & Screwdrivers** (4 models) - 🔜 Coming soon
5. **Cordless Angle Drills** (1 model) - 🔜 Coming soon
6. **Cordless SDS Hammer Drills** (15 models) - 🔜 Coming soon

## Adding New Categories

To add a new category:

1. Create a new folder in `pages/` (e.g., `pages/new-category/`)
2. Copy `index.html` from an existing category
3. Update the title, heading, and table data
4. Add a link in the main `index.html` navigation
5. Update the category count in the navigation card

## Customization

- **Main page styles**: Edit `assets/css/main.css`
- **Category page styles**: Edit `assets/css/category.css`
- **PDF generation**: Modify `assets/js/category.js`
- **Colors and branding**: Update CSS variables in the stylesheets

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, CSS Variables
- **JavaScript**: ES6+ (Vanilla)
- **html2pdf.js**: v0.10.1 for PDF generation
- **Google Fonts**: Inter font family

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers supported

## Development Notes

- All paths use relative URLs for portability
- Images loaded from New Local Tools CDN
- PDF generation requires internet connection for html2pdf.js CDN
- No build process required - pure HTML/CSS/JS

## License

© 2025 New Local Tools. All rights reserved.
