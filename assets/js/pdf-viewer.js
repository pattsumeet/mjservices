/**
 * MJ "ATOZ" SERVICES - Interactive Company Profile Document Viewer
 * Displays all 15 pages of the official company profile with download option
 */

document.addEventListener('DOMContentLoaded', () => {
  const totalPages = 15;
  let currentPage = 1;
  let zoomLevel = 1.0;

  const pageNames = [
    "Cover & Company Profile, Services, Strengths",
    "Workforce Capability & Prestigious Client List",
    "Proprietor Details, Office Coordinates & Official Stamp",
    "Commercial Terms & 20-Day Credit Policy",
    "ESIC Statutory Registration Order (Sec 1(5))",
    "EPFO Provident Fund Code Number Intimation",
    "Government of India GST Registration Certificate (REG-06)",
    "GST Registration - Annexure A",
    "GST Registration - Annexure B (Proprietor Photo)",
    "Ministry of MSME - Udyam Registration Certificate (P1)",
    "Ministry of MSME - Udyam Registration Certificate (P2)",
    "Govt. of Maharashtra Shop & Est. Form 'F' (P1)",
    "Govt. of Maharashtra Shop & Est. Form 'F' (P2)",
    "Govt. of Maharashtra Shop & Est. Self Declaration",
    "Official Closing Seal & Acknowledgement"
  ];

  const mainPageImg = document.getElementById('activeDocPage');
  const pageNumDisplay = document.getElementById('currentPageNum');
  const pageNameDisplay = document.getElementById('activePageName');
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');
  const fullscreenBtn = document.getElementById('fullscreenDocBtn');
  const viewerContainer = document.getElementById('profileViewerStage');
  const thumbContainer = document.getElementById('thumbnailDrawer');

  function renderThumbnails() {
    if (!thumbContainer) return;
    thumbContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const item = document.createElement('div');
      item.className = `thumb-item ${i === currentPage ? 'active' : ''}`;
      item.dataset.page = i;

      const img = document.createElement('img');
      img.src = `assets/pdf-pages/page_${i}.png`;
      img.alt = `Page ${i}: ${pageNames[i - 1]}`;
      img.loading = 'lazy';

      const label = document.createElement('div');
      label.className = 'thumb-label';
      label.textContent = `Page ${i}`;

      item.appendChild(img);
      item.appendChild(label);

      item.addEventListener('click', () => {
        goToPage(i);
      });

      thumbContainer.appendChild(item);
    }
  }

  function goToPage(page) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;

    if (mainPageImg) {
      mainPageImg.src = `assets/pdf-pages/page_${currentPage}.png`;
      mainPageImg.alt = `Company Profile - Page ${currentPage}: ${pageNames[currentPage - 1]}`;
    }

    if (pageNumDisplay) pageNumDisplay.textContent = currentPage;
    if (pageNameDisplay) pageNameDisplay.textContent = pageNames[currentPage - 1];

    if (prevBtn) prevBtn.disabled = (currentPage === 1);
    if (nextBtn) nextBtn.disabled = (currentPage === totalPages);

    // Update active thumbnail
    document.querySelectorAll('.thumb-item').forEach(el => {
      const p = parseInt(el.dataset.page, 10);
      if (p === currentPage) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        el.classList.remove('active');
      }
    });
  }

  function setZoom(factor) {
    zoomLevel = factor;
    if (zoomLevel < 0.7) zoomLevel = 0.7;
    if (zoomLevel > 2.0) zoomLevel = 2.0;

    if (mainPageImg) {
      mainPageImg.style.transform = `scale(${zoomLevel})`;
      mainPageImg.style.transformOrigin = 'top center';
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => setZoom(zoomLevel + 0.15));
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => setZoom(zoomLevel - 0.15));
  }

  if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => setZoom(1.0));
  }

  if (fullscreenBtn && viewerContainer) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        viewerContainer.requestFullscreen().catch(err => {
          console.error("Fullscreen error:", err);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only if not in an input/textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      goToPage(currentPage + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goToPage(currentPage - 1);
    }
  });

  // Switch between Interactive Reader & Native PDF Embed
  const tabReader = document.getElementById('tabInteractiveReader');
  const tabNative = document.getElementById('tabNativePdf');
  const viewReader = document.getElementById('readerView');
  const viewNative = document.getElementById('nativePdfView');

  if (tabReader && tabNative && viewReader && viewNative) {
    tabReader.addEventListener('click', () => {
      tabReader.classList.add('active');
      tabNative.classList.remove('active');
      viewReader.style.display = 'block';
      viewNative.style.display = 'none';
    });

    tabNative.addEventListener('click', () => {
      tabNative.classList.add('active');
      tabReader.classList.remove('active');
      viewReader.style.display = 'none';
      viewNative.style.display = 'block';
    });
  }

  // Initialize
  renderThumbnails();
  goToPage(1);
});
