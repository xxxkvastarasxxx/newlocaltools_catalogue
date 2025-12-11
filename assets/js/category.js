// Category Page Script
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadPdf');

    // Function to convert loaded image to base64 using canvas
    function imageToBase64(img) {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || 100;
            canvas.height = img.naturalHeight || 100;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', async function() {
            const pageTitle = document.querySelector('.page-title h1').textContent;
            const today = new Date().toISOString().split('T')[0];

            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Generating PDF...
            `;
            this.disabled = true;

            try {
                // Capture the table as screenshot and fit to A4 landscape
                const tableWrapper = document.querySelector('#comparisonTable');
                
                // Capture table as canvas
                const canvas = await html2canvas(tableWrapper, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });
                
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                
                // A4 landscape: 297mm x 210mm
                const pageWidth = 297;
                const pageHeight = 210;
                const margin = 5;
                
                // Calculate dimensions to fit on page
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const imgRatio = imgWidth / imgHeight;
                
                const maxWidth = pageWidth - (margin * 2);
                const maxHeight = pageHeight - (margin * 2);
                
                let finalWidth, finalHeight;
                
                if (imgRatio > (maxWidth / maxHeight)) {
                    // Image is wider - fit to width
                    finalWidth = maxWidth;
                    finalHeight = maxWidth / imgRatio;
                } else {
                    // Image is taller - fit to height
                    finalHeight = maxHeight;
                    finalWidth = maxHeight * imgRatio;
                }
                
                // Center on page
                const x = (pageWidth - finalWidth) / 2;
                const y = (pageHeight - finalHeight) / 2;
                
                // Create PDF
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('landscape', 'mm', 'a4');
                pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
                pdf.save(`NLT_${pageTitle.replace(/\s+/g, '_')}_${today}.pdf`);
                
                downloadBtn.innerHTML = originalContent;
                downloadBtn.disabled = false;
                
            } catch (error) {
                console.error('PDF generation error:', error);
                alert('Error generating PDF. Please try again.');
                downloadBtn.innerHTML = originalContent;
                downloadBtn.disabled = false;
            }
        });
    }

    // Image lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});
