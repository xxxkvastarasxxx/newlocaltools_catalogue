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
                // Get the original table
                const originalTable = document.querySelector('#comparisonTable table');
                
                // Convert all visible images to base64 using canvas
                const imageMap = new Map();
                const imageElements = originalTable.querySelectorAll('.image-cell img');
                
                imageElements.forEach(img => {
                    if (img.complete && img.naturalWidth > 0) {
                        const base64 = imageToBase64(img);
                        if (base64) {
                            imageMap.set(img.src, base64);
                        }
                    }
                });
                
                // Build HTML string for PDF
                let tableRows = '';
                const tbody = originalTable.querySelector('tbody');
                if (tbody) {
                    tbody.querySelectorAll('tr').forEach(row => {
                        let cells = '';
                        row.querySelectorAll('td').forEach((cell, idx) => {
                            let content = '';
                            let style = 'padding:3px 2px;border:1px solid #dee2e6;font-size:8px;vertical-align:middle;';
                            
                            if (idx === 0) { // Model
                                const strong = cell.querySelector('strong');
                                const small = cell.querySelector('small');
                                content = `<strong style="font-size:9px;">${strong ? strong.textContent : ''}</strong><br><span style="font-size:7px;color:#666;">${small ? small.textContent : ''}</span>`;
                                style += 'width:11%;';
                            } else if (idx === 1) { // Image
                                const img = cell.querySelector('img');
                                if (img) {
                                    const base64Src = imageMap.get(img.src);
                                    if (base64Src) {
                                        content = `<img src="${base64Src}" style="width:32px;height:32px;object-fit:contain;">`;
                                    } else {
                                        content = `<div style="width:32px;height:32px;background:#f0f0f0;"></div>`;
                                    }
                                }
                                style += 'width:7%;text-align:center;';
                            } else if (idx === 2) { // Price
                                content = cell.textContent.trim();
                                style += 'width:7%;font-weight:700;color:#2557cc;';
                            } else if (idx === 3) { // Torque
                                content = cell.textContent.trim();
                                style += 'width:7%;';
                                if (cell.classList.contains('highlight-cell')) {
                                    style += 'background:#fff9e6;color:#d35400;font-weight:700;';
                                }
                            } else if (idx === 4) { // Length
                                content = cell.textContent.trim();
                                style += 'width:6%;';
                            } else if (idx === 5) { // Weight
                                content = cell.textContent.trim();
                                style += 'width:6%;';
                            } else if (idx === 6) { // Speed
                                content = cell.textContent.trim();
                                style += 'width:9%;';
                            } else if (idx === 7) { // Impact
                                content = cell.textContent.trim();
                                style += 'width:9%;';
                            } else if (idx === 8) { // Features
                                content = cell.textContent.trim();
                                style += 'width:38%;font-size:7px;';
                            }
                            
                            cells += `<td style="${style}">${content}</td>`;
                        });
                        tableRows += `<tr>${cells}</tr>`;
                    });
                }

                const pdfHTML = `
                    <div style="background:white;padding:3px 8px;font-family:Arial,sans-serif;width:1050px;">
                        <div style="text-align:center;margin-bottom:3px;">
                            <h1 style="color:#2557cc;margin:0 0 1px 0;font-size:15px;font-weight:700;">New Local Tools</h1>
                            <h2 style="color:#2c3e50;margin:0 0 1px 0;font-size:10px;font-weight:600;">${pageTitle} - Complete Comparison</h2>
                            <p style="color:#666;margin:0 0 2px 0;font-size:7px;">Generated on ${new Date().toLocaleDateString('en-GB')} | newlocaltools.uk</p>
                        </div>
                        <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
                            <thead>
                                <tr>
                                    <th style="width:11%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Model</th>
                                    <th style="width:7%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Image</th>
                                    <th style="width:7%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Price</th>
                                    <th style="width:7%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Max Torque</th>
                                    <th style="width:6%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Length</th>
                                    <th style="width:6%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Weight</th>
                                    <th style="width:9%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Speed Range</th>
                                    <th style="width:9%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Impact Rate</th>
                                    <th style="width:38%;padding:4px 2px;background:#2557cc;color:white;font-size:8px;border:1px solid #1a4299;font-weight:600;">Key Features</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                `;

                // Create temporary container - hidden off-screen
                const pdfContainer = document.createElement('div');
                pdfContainer.innerHTML = pdfHTML;
                pdfContainer.style.cssText = 'position:absolute;left:-9999px;top:0;background:white;';
                document.body.appendChild(pdfContainer);
                
                const contentElement = pdfContainer.firstElementChild;
                
                // Small delay to ensure rendering is complete
                await new Promise(resolve => setTimeout(resolve, 300));

                // Generate PDF with mobile-optimized settings
                const opt = {
                    margin: [3, 3, 3, 3],
                    filename: `NLT_${pageTitle.replace(/\s+/g, '_')}_${today}.pdf`,
                    image: { type: 'jpeg', quality: 0.9 },
                    html2canvas: { 
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        windowWidth: 1200,
                        windowHeight: 1000,
                        scrollY: 0,
                        scrollX: 0
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'landscape',
                        compress: true
                    },
                    pagebreak: { mode: 'avoid-all' }
                };

                html2pdf().set(opt).from(contentElement).save().then(() => {
                    // Remove temporary element after PDF is saved
                    if (document.body.contains(pdfContainer)) {
                        document.body.removeChild(pdfContainer);
                    }
                    downloadBtn.innerHTML = originalContent;
                    downloadBtn.disabled = false;
                }).catch(err => {
                    console.error('PDF save error:', err);
                    if (document.body.contains(pdfContainer)) {
                        document.body.removeChild(pdfContainer);
                    }
                    downloadBtn.innerHTML = originalContent;
                    downloadBtn.disabled = false;
                });
                
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
