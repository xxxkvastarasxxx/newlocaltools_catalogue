// Get category from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Category name mappings for display
const categoryNames = {
    'impact-drivers': 'Cordless Impact Drivers',
    'impact-wrenches': 'Cordless Impact Wrenches',
    'combi-drills': 'Cordless Combi Drills',
    'sds-hammer-drills': 'Cordless SDS Hammer Drills',
    'angle-grinders': 'Angle Grinders',
    'jig-saws': 'Jig Saws',
    'reciprocating-saws': 'Reciprocating Saws',
    'skil-saws': 'Circular Saws'
};

// Update page title with selected category
if (category && categoryNames[category]) {
    document.getElementById('categoryTitle').textContent = categoryNames[category];
    document.title = `${categoryNames[category]} - Select Brand`;
}

// Update brand links to redirect to correct category page
if (category) {
    const dewaltLink = document.getElementById('dewaltLink');
    const makitaLink = document.getElementById('makitaLink');
    const milwaukeeLink = document.getElementById('milwaukeeLink');

    const updateBrandLink = (linkEl, href, statusText) => {
        if (!linkEl) {
            return;
        }

        if (href) {
            linkEl.href = href;
            const countEl = linkEl.querySelector('.count');
            if (countEl) {
                countEl.textContent = statusText ?? 'Accessible';
            }
            linkEl.classList.remove('brand-unavailable');
        } else {
            linkEl.href = '#';
            const countEl = linkEl.querySelector('.count');
            if (countEl) {
                countEl.textContent = statusText ?? 'Coming Soon';
            }
            linkEl.classList.add('brand-unavailable');
        }
    };

    updateBrandLink(dewaltLink, `../DeWalt/${category}/index.html`, 'Accessible');

    const makitaAvailableCategories = ['impact-drivers', 'impact-wrenches'];
    const makitaHref = makitaAvailableCategories.includes(category)
        ? `../Makita/${category}/index.html`
        : null;
    updateBrandLink(makitaLink, makitaHref);

    updateBrandLink(milwaukeeLink, null);
} else {
    // If no category is selected, redirect back to main page
    window.location.href = '../../index.html';
}
