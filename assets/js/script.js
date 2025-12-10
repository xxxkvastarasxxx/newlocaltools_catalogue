// Enhanced catalogue functionality
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    const downloadBtns = document.querySelectorAll('.btn-download:not([disabled])');
    const categoryLinks = document.querySelectorAll('.category-link');

    // Category Navigation
    function updateActiveCategory() {
        const sections = document.querySelectorAll('.category-section');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                categoryLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scroll to sections
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active category on scroll
    window.addEventListener('scroll', updateActiveCategory);
    updateActiveCategory();
    
    // PDF Download functionality for each category
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const section = document.getElementById(category);
            const table = section.querySelector('.comparison-table');
            
            if (!table) {
                alert('Comparison table not found for this category');
                return;
            }
            
            const today = new Date().toISOString().split('T')[0];
            const categoryName = section.querySelector('.category-title').textContent;
            
            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Generating PDF...
            `;
            this.disabled = true;
            
            const opt = {
                margin: [10, 10, 10, 10],
                filename: `NLT_${category.replace(/-/g, '_')}_${today}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    letterRendering: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'landscape' 
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };
            
            // Add title and branding to PDF
            const pdfContent = document.createElement('div');
            pdfContent.style.padding = '20px';
            pdfContent.style.fontFamily = 'Inter, sans-serif';
            
            const header = document.createElement('div');
            header.style.marginBottom = '20px';
            header.style.textAlign = 'center';
            header.innerHTML = `
                <h1 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 28px;">New Local Tools</h1>
                <h2 style="color: #3498db; margin: 0 0 10px 0; font-size: 20px;">${categoryName} - Complete Comparison</h2>
                <p style="color: #7f8c8d; margin: 0; font-size: 12px;">Generated on ${new Date().toLocaleDateString('en-GB')} | newlocaltools.uk</p>
            `;
            
            pdfContent.appendChild(header);
            pdfContent.appendChild(table.cloneNode(true));
            
            html2pdf().set(opt).from(pdfContent).save().then(function() {
                // Restore button
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }).catch(function(error) {
                console.error('PDF generation error:', error);
                alert('Error generating PDF. Please try again.');
                btn.innerHTML = originalContent;
                btn.disabled = false;
            });
        });
    });
    
    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effect for product cards
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Lazy load images for better performance
    const images = document.querySelectorAll('.product-image img, .image-cell img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Add CSS animation for fade-in effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);
