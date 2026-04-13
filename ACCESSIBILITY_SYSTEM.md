# Accessibility System Documentation

## Overview

A production-grade, SaaS-level accessibility system that provides comprehensive control over website readability, visual presentation, and user interaction. This system works globally across all pages and components without breaking existing functionality.

## Architecture

### Core Components

1. **AccessibilityContext** (`src/context/AccessibilityContext.jsx`)
   - Global state management using React Context API
   - localStorage persistence for user preferences
   - Automatic settings application on mount (no flicker)
   - Keyboard shortcut handler (Ctrl + F2)

2. **AccessibilityPanel** (`src/components/Accessibility/AccessibilityPanel.jsx`)
   - Slide-in panel UI with all controls
   - Organized into logical sections
   - Real-time preview of changes
   - Responsive design

3. **AccessibilityButton** (`src/components/Accessibility/AccessibilityButton.jsx`)
   - Floating action button (bottom-right corner)
   - Animated entrance
   - Tooltip with keyboard shortcut hint

4. **Global CSS** (`src/styles/accessibility.css`)
   - CSS variables for dynamic styling
   - Class-based feature toggles
   - Safe color inversion (preserves images)
   - Print-friendly overrides

## Features

### 1. Text Size Control
- **Range:** 80% to 150%
- **Implementation:** CSS variables with rem-based scaling
- **Preserves:** Layout integrity, responsive breakpoints

### 2. Text Spacing
- **Range:** 0px to 5px
- **Affects:** Letter-spacing and word-spacing
- **Use Case:** Improves readability for dyslexia

### 3. Line Height
- **Range:** 1.2 to 2.5
- **Default:** 1.5
- **Use Case:** Reduces visual crowding

### 4. Dyslexia Friendly Font
- **Font:** OpenDyslexic (Google Fonts fallback)
- **Enhancements:** Increased spacing, higher line-height
- **Scope:** Global font replacement

### 5. ADHD Focus Mode
- **Effect:** Dims header, footer, sidebars
- **Highlights:** Main content area
- **Interaction:** Elements restore on hover

### 6. Saturation Control
- **Range:** 0% (grayscale) to 200% (hyper-saturated)
- **Implementation:** CSS filter
- **Use Case:** Reduces visual stimulation

### 7. Invert Colors
- **Smart Inversion:** Preserves images and videos
- **Implementation:** Dual filter (invert + hue-rotate)
- **Use Case:** Dark mode alternative

### 8. Highlight Links
- **Visual:** Underline + background color + bold
- **Contrast:** High-contrast blue (#0066cc)
- **Hover:** Enhanced background

### 9. Text to Speech
- **API:** Web Speech Synthesis API
- **Modes:** Read selection, read full page
- **Controls:** Rate adjustment (0.5x to 2x)
- **Status:** Visual indicator when speaking

### 10. Cursor Size
- **Range:** 1x to 3x
- **Implementation:** Custom SVG cursors
- **Scaling:** Proportional increase

### 11. Pause Animations
- **Scope:** All CSS animations and transitions
- **Exception:** Accessibility UI remains animated
- **Implementation:** animation-play-state: paused

### 12. Hide Images
- **Effect:** Blur + opacity reduction
- **Preserves:** Layout (no reflow)
- **Alt Text:** Displayed on hover

### 13. Reset All Settings
- **Action:** Restores defaults
- **Clears:** localStorage
- **Instant:** No page reload required

## Usage

### For Users

1. **Open Panel:**
   - Click floating button (bottom-right)
   - Press `Ctrl + F2`

2. **Adjust Settings:**
   - Use sliders for gradual changes
   - Toggle switches for on/off features
   - Changes apply instantly

3. **Text to Speech:**
   - Select text → Click "Read Selection"
   - Click "Read Page" for full content
   - Adjust speech rate as needed

4. **Reset:**
   - Click "Reset All Settings" to restore defaults

### For Developers

#### Integration

The system is already integrated into `App.jsx`:

```jsx
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AccessibilityPanel, AccessibilityButton } from './components/Accessibility';

<AccessibilityProvider>
  <ThemeProvider theme={theme}>
    {/* Your app */}
    <AccessibilityButton />
    <AccessibilityPanel />
  </ThemeProvider>
</AccessibilityProvider>
```

#### Accessing Settings

```jsx
import { useAccessibility } from './context/AccessibilityContext';

function MyComponent() {
  const { settings, updateSetting } = useAccessibility();
  
  // Read current settings
  console.log(settings.textSize);
  
  // Update a setting
  updateSetting('textSize', 1.2);
}
```

#### Excluding Elements

To prevent accessibility features from affecting specific elements:

```jsx
<div className="a11y-keep">
  {/* This content won't be affected by pause animations, hide images, etc. */}
</div>
```

## Technical Details

### CSS Variables

```css
:root {
  --a11y-font-size: 16px;
  --a11y-letter-spacing: 0px;
  --a11y-word-spacing: 0px;
  --a11y-line-height: 1.5;
  --a11y-saturation: 100%;
  --a11y-cursor-size: 1;
}
```

### CSS Classes

- `.a11y-active` - Applied to `<html>` when system is active
- `.a11y-dyslexia-font` - Dyslexia-friendly font
- `.a11y-adhd-mode` - ADHD focus mode
- `.a11y-invert-colors` - Color inversion
- `.a11y-highlight-links` - Link highlighting
- `.a11y-pause-animations` - Animation pause
- `.a11y-hide-images` - Image hiding
- `.a11y-keep` - Exclude from modifications

### localStorage

Settings are stored as JSON:

```json
{
  "textSize": 1.2,
  "textSpacing": 2,
  "lineHeight": 1.8,
  "dyslexiaFont": true,
  "adhdMode": false,
  "saturation": 80,
  "invertColors": false,
  "highlightLinks": true,
  "cursorSize": 1.5,
  "pauseAnimations": false,
  "hideImages": false,
  "ttsRate": 1,
  "ttsPitch": 1
}
```

## Performance Considerations

### Optimizations

1. **CSS Variables:** Changes don't trigger React re-renders
2. **Class Toggles:** Minimal DOM manipulation
3. **Memoization:** useCallback for all handlers
4. **Lazy Loading:** Panel only renders when open
5. **No Layout Shifts:** All features preserve layout

### Browser Support

- **Modern Browsers:** Full support (Chrome, Firefox, Safari, Edge)
- **Text-to-Speech:** Requires Web Speech API (95%+ support)
- **CSS Variables:** IE11 not supported (use polyfill if needed)

## Accessibility of Accessibility

The accessibility panel itself is fully accessible:

- **Keyboard Navigation:** Tab through all controls
- **Screen Readers:** Proper ARIA labels
- **Focus Indicators:** Visible focus states
- **Color Contrast:** WCAG AA compliant
- **Touch Targets:** Minimum 44x44px

## Testing

### Manual Testing Checklist

- [ ] Text size changes affect all text
- [ ] Text spacing doesn't break layout
- [ ] Dyslexia font loads correctly
- [ ] ADHD mode dims non-content areas
- [ ] Saturation slider works smoothly
- [ ] Color inversion preserves images
- [ ] Links are clearly highlighted
- [ ] TTS reads selected text
- [ ] TTS reads full page content
- [ ] Cursor size increases visibly
- [ ] Animations pause completely
- [ ] Images blur but layout stays intact
- [ ] Settings persist after refresh
- [ ] Reset button clears all settings
- [ ] Ctrl+F2 toggles panel
- [ ] Mobile responsive

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Troubleshooting

### Settings Not Persisting

**Issue:** Settings reset on page reload
**Solution:** Check localStorage is enabled in browser

### Text-to-Speech Not Working

**Issue:** "Not supported" message
**Solution:** Use Chrome, Firefox, or Safari (not supported in some browsers)

### Animations Still Playing

**Issue:** Some animations continue when paused
**Solution:** Add `.a11y-keep` class to exclude specific elements

### Layout Breaking

**Issue:** Text size causes overflow
**Solution:** Ensure containers use flexible units (%, rem, em)

## Future Enhancements

Potential additions:

1. **Reading Ruler:** Horizontal line following cursor
2. **Screen Mask:** Dim everything except focus area
3. **Keyboard Navigation Hints:** Visual keyboard shortcuts
4. **Color Blind Modes:** Specific color adjustments
5. **Font Options:** Multiple dyslexia-friendly fonts
6. **Profile Presets:** Save multiple configurations
7. **Export/Import:** Share settings across devices

## Support

For issues or feature requests, contact the development team.

## License

Proprietary - Focus Stock Broker Ltd
