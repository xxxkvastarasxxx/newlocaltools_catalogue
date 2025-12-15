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

    // Set DeWalt link to the category index page
    dewaltLink.href = `../${category}/index.html`;

    // Future: These will be enabled when brand pages are created
    // makitaLink.href = `../${category}/index.html`;
    // milwaukeeLink.href = `../${category}/index.html`;
} else {
    // If no category is selected, redirect back to main page
    window.location.href = '../../index.html';
}
