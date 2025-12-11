# Image Reference Guide

This guide lists all available images in the `images/` directory that can be embedded in markdown content files.

## How to Use Images in Markdown

```markdown
![Alt text describing the image](../images/filename.jpg)
```

## Available Images by Category

### Logo & Branding
- `logo150.jpg` - Society logo (150x150px, primary logo)
- `logo100.jpg` - Society logo (100px version)
- `cfmslog1.gif` - CFMS logo

### Clubhouse Photos
- `ch_blr.jpg` - Clubhouse building exterior (main photo)
- `ch_hall400.jpg` - Meeting hall interior (400px)
- `ch_hall200.jpg` - Meeting hall interior (200px)
- `ch_kitch400.jpg` - Kitchen area (400px)

### Lapidary Shop
- `lap_indx.jpg` - Shop interior (index size)
- `lap1_250.jpg` - Shop photo (250px)
- `lap_ext400.jpg` - Shop exterior (400px)

### Frog Graphics (Fun Seasonal Decorations)
The "Frogtown" themed graphics - use these for visual interest!
- `frogbutton.gif` - Classic frog button (54x37px)
- `frog_hammock.jpg` - Frog in hammock
- `frog_santa.gif` - Frog Santa (holiday)
- `frog_santaR.gif` - Frog Santa variant
- `frog_ghost.gif` - Frog ghost (Halloween)
- `frog_flower.gif` - Frog with flower
- `frog_pilgrim.gif` - Frog pilgrim (Thanksgiving)
- `frog_rabbit.gif` - Frog with rabbit/Easter
- `frog_hoppy_valentine.gif` - Frog Valentine
- `frog_pot-o-gold.gif` - Frog with pot of gold
- `frog_burst.gif` - Frog burst/celebration
- `frog_barge.jpg` - Frog on barge/water
- `frog_PatHat.gif` - Frog with Patrick hat
- `frog_flower.gif` - Frog flower variant

### Navigation Buttons (Reference Only - Not Used in New Design)
These are available if you want to recreate button-based navigation:
- `b_main.jpg` - Home button
- `b_main-on.jpg` - Home button (hover state)
- `b_dealers.jpg` - Dealers button
- `b_dealers-on.jpg` - Dealers (hover)
- `b_demos.jpg` - Demonstrations button
- `b_demos-on.jpg` - Demonstrations (hover)
- `b_exhibits.jpg` - Exhibits button
- `b_exhibits-on.jpg` - Exhibits (hover)
- `b_maps.jpg` - Maps button
- `b_maps-on.jpg` - Maps (hover)
- `b_other.jpg` - Other/Activities button
- `b_other-on.jpg` - Other (hover)
- `b_members.jpg` - Members button
- `b_contactus.jpg` - Contact us button
- `b_clickhere-enter.gif` - Click here to enter

### Maps & Geography
- `CFMS-Clubhouse-Map.gif` - Clubhouse map
- `map_fairgrounds.gif` - Fairgrounds map

### Decorative Elements
- `bar_tran.gif` - Transparent bar/divider
- `dot-gold.gif` - Gold dot decoration
- `crystals.jpg` - Crystal/mineral image

### Miscellaneous
- `cgms_faire_2021_mar.png` - Fair 2021 event image
- `404_background.jpg` - 404 error page background
- `line-vert.gif` - Vertical line divider

## Example Usage in Markdown

### Adding a clubhouse photo to a page:
```markdown
## Our Clubhouse

![Clubhouse Building](../images/ch_blr.jpg)

The clubhouse is nestled in the Mother Lode foothills...
```

### Adding a seasonal frog graphic:
```markdown
## Holiday Message

![Festive Frog](../images/frog_santa.gif)

Join us this holiday season for our special events!
```

### Using multiple images:
```markdown
## Facilities

### Meeting Hall
![Meeting Hall](../images/ch_hall400.jpg)

### Lapidary Shop
![Shop Interior](../images/lap_indx.jpg)
```

## Tips for Content Editors

1. **Image Paths**: Always use relative paths starting with `../images/`
2. **Alt Text**: Include descriptive alt text in brackets for accessibility
3. **File Sizes**: Images are in `images/` directory - they're already optimized
4. **Seasonal Images**: Use the frog graphics to add visual interest and seasonal themes
5. **Responsive**: Images will automatically scale to fit the content area

## Adding New Images

To add a new image:
1. Place the image file in the `images/` directory
2. Reference it in markdown with: `![Description](../images/filename.ext)`
3. Commit and push to GitHub - it appears automatically

---

Last Updated: December 2025
