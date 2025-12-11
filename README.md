# Calaveras Gem & Mineral Society - Refactored Site

## Overview

This website has been refactored from a static WYSIWYG-generated HTML site to a modern, maintainable template-driven architecture. The site maintains the exact same visual appearance while enabling content-template separation and easier future updates.

## Architecture

### Components

- **Template**: Single `index.html` template copied to all pages
- **Styling**: `css/main.css` - consolidated stylesheet with CSS variables for colors and layout
- **Content**: `content/[pagename].md` - markdown files for page body content
- **JavaScript**: `js/app.js` - page loader that fetches and renders content
- **Data**: `data/site-config.json` - site metadata and navigation configuration

### How It Works

1. **On Page Load**: User navigates to any `.html` page (they're all identical templates)
2. **JavaScript Executes**: `app.js` loads and runs automatically
3. **Page Detection**: JavaScript determines which page was requested by analyzing the URL
4. **Data Loading**: Navigation configuration is loaded from `data/site-config.json`
5. **Content Fetch**: Markdown content is fetched from `content/[pageId].md`
6. **Parsing & Rendering**: Content is parsed using the **Marked** library, sanitized with **DOMPurify**, and inserted into the page
7. **Page-Specific Features**: Meeting date calculation runs on home page, image preloading runs on show page

## Technologies Used

- **Marked** (CDN): Fast markdown-to-HTML parser
- **DOMPurify** (CDN): XSS prevention for user-generated content
- **Modern HTML5**: Semantic markup (header, nav, main, footer)
- **CSS3**: Grid/Flexbox layout, CSS variables for theming
- **Vanilla JavaScript**: No framework dependencies

## File Structure

```
calaverasgemandmineral/
├── index.html                    # Template (all HTML pages are copies of this)
├── history.html, membership.html, etc. # All pages use identical template
├── css/
│   └── main.css                 # All styling
├── js/
│   └── app.js                   # Page loader and initialization
├── data/
│   └── site-config.json         # Navigation and site metadata
├── content/
│   ├── index.md                 # Home page content
│   ├── history.md               # History page content
│   ├── membership.md            # Membership page content
│   ├── field.md                 # Field trips page content
│   ├── lapidary.md              # Lapidary shop page content
│   ├── links.md                 # Links page content
│   ├── contact.md               # Contact page content
│   ├── show.md                  # Gem show main page
│   ├── showdealers.md           # Show dealers page
│   ├── showdemos.md             # Show demonstrations page
│   ├── showexhibits.md          # Show exhibits page
│   ├── showother.md             # Show activities & more page
│   ├── showvisitor.md           # Show visitor information
│   ├── show_campinglodging.md   # Camping & lodging page
│   ├── map_clubhouse.md         # Clubhouse map page
│   ├── map_fairgrounds.md       # Fairgrounds map page
│   ├── map_norcal.md            # NorCal clubs map page
│   ├── members.md               # Members area page
│   ├── shopschedule.md          # Shop schedule page
│   ├── newsletters.md           # Newsletters page
│   └── mem-enter.md             # Member login redirect
├── images/                      # Site images (unchanged)
├── docs/                        # PDF documents (unchanged)
└── newsletters/                 # Newsletter archives (unchanged)
```

## Adding or Editing Content

### To Edit Existing Page Content

1. Open the corresponding markdown file in `content/`
2. Edit the markdown (supports headers, paragraphs, bold, italic, links, lists, etc.)
3. Save the file
4. Refresh the page in browser - changes appear automatically

### To Add a New Page

1. Create a new markdown file: `content/newpage.md`
2. Copy any existing `.html` file and rename it: `newpage.html`
3. Add the page to `data/site-config.json` navigation array
4. The page will automatically work once the files are deployed

### Supported Markdown Features

- Headings: `# H1`, `## H2`, `### H3`, etc.
- Bold: `**text**`
- Italic: `*text*`
- Links: `[Link text](url)`
- Lists: `- item` or `1. item`
- Code blocks: ````code```
- Paragraphs: separated by blank lines

## Styling & Customization

### Color Scheme

Colors are defined as CSS variables in `css/main.css` (`:root` section):

```css
--color-primary-green: #005100
--color-bright-green: #008000
--color-accent-orange: #dc4b05
--color-nav-bg: #f2eb8c
/* ... and more */
```

### Layout

- **Site Width**: 700px (preserved from original)
- **Typography**: Verdana, Arial sans-serif
- **Layout System**: CSS Grid and Flexbox (replaces table-based layout)

### Making Style Changes

1. Edit `css/main.css`
2. Modify CSS variables in `:root` for global color/size changes
3. Update specific selectors for targeted adjustments
4. Changes apply to all pages instantly

## JavaScript Functionality

### Page Loader (`js/app.js`)

- **`initializeApp()`**: Loads config, detects current page, renders nav
- **`loadPageContent()`**: Fetches markdown, parses it, sanitizes output
- **`updateMeetingText()`**: Calculates next third Sunday for home page
- **`preloadImages()`**: Pre-caches hover images for show page buttons

### Adding Page-Specific Features

Add conditions in the `DOMContentLoaded` event listener:

```javascript
if (currentPageId === 'yourpage') {
  yourPageFunction();
}
```

## Browser Compatibility

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- External CDN libraries used: Marked, DOMPurify

## Deployment

### GitHub Pages

The site is hosted on GitHub Pages. No build process required.

1. Make changes to markdown files and CSS
2. Commit and push to repository
3. Changes deploy automatically

### Local Testing

Open any `.html` file in a modern browser. If running from `file://` protocol, CORS may block the markdown fetch - use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Then visit `http://localhost:8000`

## Migration Notes

- **Original HTML**: Backed up as `index.html.backup`
- **All 21 pages**: Converted to use new template
- **Content Extraction**: All original page body content moved to markdown
- **Visual Fidelity**: CSS carefully matched original appearance
- **Functionality Preserved**: Meeting calculation, image preloading, all features working

## Future Improvements

Possible enhancements without major refactoring:

1. **Responsive Design**: Add mobile breakpoints to CSS for smaller screens
2. **Build Tool**: Consider static site generator (11ty, Hugo) for production
3. **Search**: Add Lunr.js or similar for full-text search
4. **Analytics**: Integrate with Google Analytics or similar
5. **Comments**: Add discussion threads for pages
6. **CMS**: Integrate with headless CMS for remote content editing

## Support & Questions

For questions about the site architecture or maintenance:

Contact: calaverasgemandmineralsociety@gmail.com

---

**Site Refactored**: December 2025  
**Current Version**: 2.0 (Template-based)  
**Compatibility**: GitHub Pages native support
