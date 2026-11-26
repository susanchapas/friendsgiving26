# Harvest Menu 2026

An interactive Friendsgiving 2026 dining menu featuring homemade, locally sourced, farm-to-table autumn dishes.

## Live Site

View the live menu on GitHub Pages: **[https://susanchapas.github.io/friendsgiving26/](https://susanchapas.github.io/friendsgiving26/)**

## The Menu

Dietary key: ○ Vegetarian (green outline) · ● Halal (red dot)

### Mains
- **Roasted Turkey** — *herbs · pan jus*
- **Duck Stew** ● — *tomato ginger sauce*
- **Rosemary Garlic Lamb** — *rosemary · black pepper · garlic*
- **Skillet Pumpkin Cannellini** ○ — *tofu · parmesan · sage*

### Sides
- **Harvest Salad** ○ — *butternut squash · pomegranate*
- **Baked Mac and Cheese** ○ — *aged cheddar · gruyère*
- **Honey Thyme Roasted Carrots** ○ — *wildflower honey · thyme*
- **Sweet Potato Wedges** ○ — *oven roasted*
- **Red Beans** ○ — *tomato sauce*
- **Jasmine Rice** ○ — *garlic*

### Dessert
- **Apple Turnovers** ○ — *puff pastry · apples*

## Features

- **Split-Column Editorial Layout**: Pairs an ink-wash autumn harvest illustration on black stone with a scrollable warm paper menu.
- **Sticky Course Navigation**: Quick-jump navigation (`Mains`, `Sides`, `Dessert`) with active-section scroll tracking on portrait screens.
- **Fit-to-Screen Landscape Layout**: On landscape screens the menu switches to a two-column grid that scales with viewport height to fit without scrolling.
- **Dietary Dots**: A green outline dot (Vegetarian) and a filled red dot (Halal) on dishes, with a matching legend in the masthead.
- **Interactive Dish Selection**: Clicking or tapping a dish toggles selection with an ink-bloom effect and a burst of falling autumn leaves rendered on an HTML5 canvas (respects `prefers-reduced-motion`).
- **Responsive & Print-Ready**: Adapts cleanly across desktop, mobile, and print layouts.

## Project Structure

- [`index.html`](index.html) — Semantic page structure, metadata, and Google Fonts (`Coustard` and `Instrument Sans`)
- [`styles.css`](styles.css) — Split-column layout, editorial typography, animations, and responsive/print styles
- [`app.js`](app.js) — Menu data, course rendering, scroll-spy navigation, dish selection state, and HTML5 canvas autumn leaf particle animation
- `assets/` — Ink-wash harvest artwork

## Running Locally

Open `index.html` directly in your browser, or serve the directory with a local static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## License

Licensed under the [MIT License](LICENSE).
