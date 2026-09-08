# Rover CSS Library

Multi-brand tokenized core CSS library for the Rover interface and Lunar page builder.

## Installation

```bash
npm install rover
# or via GitHub
npm install github:designersayap/rover
```

## Usage

Import the main bundle into your project:

```javascript
import 'rover';
// or
import 'rover/src/index.css';
```

## Multi-Brand Architecture

Rover provides a modular token architecture:

1. **Base Foundations (`src/base.css`)**: Layout grid primitives, spacing scale (`--rv-space-*`), shell dimensions, and utility classes.
2. **Brand Themes (`src/tokens/`)**: Brand identity mappings (default: `lunar.css`, demo: `apollo.css`, blueprint: `template.css`).

### Switching Brands

Brands are scoped using the `data-rv-brand` attribute on `<html>`, `<body>`, or any container:

```html
<!-- Default Lunar Brand -->
<body data-rv-brand="lunar">

<!-- Switch to Apollo Brand -->
<body data-rv-brand="apollo">

<!-- Nested Preview (e.g. previewing another brand inside a canvas) -->
<div data-rv-brand="apollo">
    ...
</div>
```

If no `data-rv-brand` attribute is specified, Rover automatically defaults to the `lunar` brand theme.

### Adding a New Brand

1. Copy `src/tokens/template.css` to `src/tokens/<my-brand>.css`.
2. Define your brand's primary colors, font, and button radius:

```css
[data-rv-brand="my-brand"] {
    --rv-brand-primary:        #ff5722;
    --rv-brand-primary-hover:  #f4511e;
    --rv-brand-primary-active: #e64a19;
    --rv-brand-primary-subtle: #fbe9e7;
    --rv-brand-font:           'Inter', sans-serif;
    --rv-brand-radius-button:  4px;
}
```

3. Import the file or include it in `index.css`.

## Project Structure

- `src/tokens/`: Brand identity definitions (`lunar.css`, `apollo.css`, `template.css`) including component aliases.
- `src/base.css`: Primitive spacing scale, layout dimensions, layout primitives, and atomic utility classes.
- `src/shell.css`: App containers, canvas viewport, and workspace interaction states.
- `src/sidebar.css`: Floating sidebar, rails, tree layers, and tab modules.
- `src/topbar.css`: Main navigation topbar.
- `src/notification.css`: 3D card-to-card notification stacks.
- `src/components.css`: Atomic UI building blocks (buttons, inputs, toggles, list items, cards, badges, loaders).
- `src/overlays.css`: Popovers, tooltips, selection overlay badges, floating action bars, and contextual toolbars.
- `src/index.css`: Main bundle.
