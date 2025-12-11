/**
 * Calaveras Gem & Mineral Society - Page Loader
 * Dynamically loads and renders pages from JSON and Markdown content
 */

let siteConfig = null;
let currentPageId = null;

/**
 * Initialize the application
 */
async function initializeApp() {
  try {
    // Load site configuration
    const configResponse = await fetch('data/site-config.json');
    siteConfig = await configResponse.json();
    
    // Detect current page from URL or filename
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    const pageIdMatch = filename.match(/^([a-z-]+)\.html$/);
    currentPageId = pageIdMatch ? pageIdMatch[1] : 'index';
    
    // Render page components
    renderNavigation();
    await loadPageContent();
    
    // Set page title
    const pageConfig = siteConfig.pages.find(p => p.id === currentPageId);
    if (pageConfig) {
      document.title = pageConfig.title;
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

/**
 * Render the main navigation bar
 */
function renderNavigation() {
  const navContainer = document.getElementById('main-nav');
  if (!navContainer) return;
  
  let navHtml = '<table><tr>';
  
  siteConfig.navigation.forEach(item => {
    const isActive = item.id === currentPageId;
    const activeClass = isActive ? ' class="active"' : '';
    const linkColor = isActive ? ' style="color: #dc4b05;"' : '';
    navHtml += `<td align="center"><b><font face="Verdana" size="1"><a href="${item.href}"${linkColor}>${item.label}</a></font></b></td>`;
  });
  
  navHtml += '</tr></table>';
  navContainer.innerHTML = navHtml;
}

/**
 * Load and render page content from markdown
 */
async function loadPageContent() {
  const contentContainer = document.getElementById('page-content');
  if (!contentContainer) return;
  
  try {
    // Construct markdown file path
    const mdPath = `content/${currentPageId}.md`;
    
    // Fetch markdown content
    let markdown;
    try {
      const response = await fetch(mdPath);
      if (!response.ok) {
        contentContainer.innerHTML = '<p>Content not found.</p>';
        return;
      }
      markdown = await response.text();
    } catch (fetchError) {
      console.warn('Fetch failed (expected if using file:// protocol):', fetchError.message);
      contentContainer.innerHTML = `
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px;">
          <p><strong>Note:</strong> To view the site properly, you need to run a local web server.</p>
          <p>The site uses fetch() which is blocked by browsers when opening files directly (file://).</p>
          <h3>Quick Setup:</h3>
          <p><strong>Python 3:</strong> <code>python -m http.server 8000</code></p>
          <p><strong>Python 2:</strong> <code>python -m SimpleHTTPServer 8000</code></p>
          <p><strong>Node.js:</strong> <code>npx http-server</code></p>
          <p>Then visit: <strong>http://localhost:8000</strong></p>
          <hr>
          <p>For GitHub Pages deployment, this works automatically without needing a server.</p>
        </div>
      `;
      return;
    }
    
    // Parse markdown to HTML using Marked
    // Note: Marked must be loaded via CDN in HTML
    if (typeof marked !== 'undefined') {
      const html = marked.parse(markdown);
      
      // Sanitize HTML to prevent XSS
      if (typeof DOMPurify !== 'undefined') {
        contentContainer.innerHTML = DOMPurify.sanitize(html);
      } else {
        // Fallback if DOMPurify not available (not recommended for production)
        contentContainer.innerHTML = html;
      }
    } else {
      contentContainer.innerHTML = markdown;
    }
  } catch (error) {
    console.error('Error loading page content:', error);
    contentContainer.innerHTML = '<p>Error loading content. Check browser console for details.</p>';
  }
}

/**
 * Calculate the next third Sunday of the month
 */
function getNextThirdSunday() {
  const now = new Date();
  
  // Find the first Sunday of the current month
  const firstSunday = new Date(now.getFullYear(), now.getMonth(), 1);
  while (firstSunday.getDay() !== 0) {
    firstSunday.setDate(firstSunday.getDate() + 1);
  }
  
  // Find the third Sunday of the current month
  const thirdSunday = new Date(firstSunday);
  thirdSunday.setDate(thirdSunday.getDate() + 14);
  
  // Check if third Sunday has passed
  if (now.getDate() > thirdSunday.getDate()) {
    // Find the third Sunday of the next month
    const nextThirdSunday = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    while (nextThirdSunday.getDay() !== 0) {
      nextThirdSunday.setDate(nextThirdSunday.getDate() + 1);
    }
    nextThirdSunday.setDate(nextThirdSunday.getDate() + 14);
    return nextThirdSunday;
  }
  
  return thirdSunday;
}

/**
 * Update meeting date text on home page
 */
function updateMeetingText() {
  // Wait for content to be loaded, then find the element
  const checkAndUpdate = () => {
    const meetingTextEl = document.getElementById('meeting-text');
    if (!meetingTextEl) {
      setTimeout(checkAndUpdate, 100);
      return;
    }
    
    const now = new Date();
    const thirdSunday = getNextThirdSunday();
    
    if (now.getDate() === thirdSunday.getDate() && 
        now.getMonth() === thirdSunday.getMonth() &&
        now.getFullYear() === thirdSunday.getFullYear()) {
      meetingTextEl.innerHTML = '<b>The monthly meeting is today!</b>';
    } else {
      meetingTextEl.innerHTML = `<b>The next monthly meeting is on ${thirdSunday.toDateString()}.</b>`;
    }
  };
  
  checkAndUpdate();
}

/**
 * Preload images for hover effects (show page)
 */
function preloadImages() {
  if (document.images) {
    const imagesToPreload = [
      'images/b_home_01-over.gif',
      'images/b_history_01-over.gif',
      'images/b_programs_01-over.gif',
      'images/b_membership_01-over.gif',
      'images/b_calendar_01-over.gif',
      'images/b_links_01-over.gif'
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
}

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  
  // Initialize page-specific functionality after content is loaded
  if (currentPageId === 'index') {
    // Wait a bit for markdown to render
    setTimeout(() => {
      updateMeetingText();
    }, 200);
  }
  
  if (currentPageId === 'show') {
    preloadImages();
  }
});

/**
 * Decode obfuscated email addresses
 * @param {string} encoded - Base64 encoded email
 */
function decodeEmail(encoded) {
  try {
    return atob(encoded);
  } catch (error) {
    console.error('Error decoding email:', error);
    return '';
  }
}

/**
 * Handle anchor links (smooth scroll)
 */
function setupAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
