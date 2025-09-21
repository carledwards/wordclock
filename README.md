# Word Clock

A unique digital clock that displays time using illuminated words instead of traditional numbers. This implementation adds an interesting twist by incorporating special date recognition, transforming the display for holidays and special occasions.

## 🚀 Quick Start

**Theme Gallery (see all themes):** https://carledwards.github.io/wordclock/gallery.html

**Individual Themes:**
- [Default](https://carledwards.github.io/wordclock/?theme=default) - Clean, minimal design
- [Terminal](https://carledwards.github.io/wordclock/?theme=terminal) - Green terminal display with monospace grid
- [Live Terminal](https://carledwards.github.io/wordclock/?theme=live-terminal) - Animated typing cursor effect
- [DOS](https://carledwards.github.io/wordclock/?theme=dos) - Classic DOS window with monospace grid
- [16-Segment](https://carledwards.github.io/wordclock/?theme=16-segment) - LED-style 16-segment display with monospace grid
- [Mac 1984](https://carledwards.github.io/wordclock/?theme=mac1984) - Classic Macintosh window
- [Liquid Glass](https://carledwards.github.io/wordclock/?theme=liquid-glass) - iOS-style glass effects

## ✨ Concept

The word clock presents time in natural language format, illuminating specific words to form readable phrases like "IT'S HALF PAST TWO" or "IT'S QUARTER TO FIVE". This creates an engaging and artistic way to display time, blending functionality with visual appeal.

## 🎯 Features

- **Natural Language Time Display** - Time shown as readable phrases
- **Multiple Themes** - Terminal, DOS, Mac 1984, and more
- **Special Date Recognition** - Holidays and birthdays with unique highlighting
- **Monospace Grid System** - Perfect character alignment for terminal themes
- **Interactive Elements** - Click words for special features
- **Custom Backgrounds** - Add your own background images
- **Mobile Responsive** - Works on all devices

## 🎨 Theme Showcase

### Terminal Themes
- **Terminal**: Classic green monospace text with perfect grid alignment
- **Live Terminal**: Animated cursor that types out the time character by character
- **DOS**: Blue background with white text in authentic DOS style
- **16-Segment**: LED-style 16-segment display with monospace grid alignment

### Classic Themes  
- **Mac 1984**: Classic Macintosh window with title bar and menu
- **Liquid Glass**: iOS-style translucent glass effects
- **Default**: Clean, minimal design

## 🎉 Special Occasions

The clock automatically recognizes special dates and transforms the display:

- **[Christmas Demo](https://carledwards.github.io/wordclock/?date=2024-12-25)** - "MERRY CHRISTMAS" in festive colors
- **[New Year Demo](https://carledwards.github.io/wordclock/?date=2024-01-01)** - "HAPPY NEW YEAR" celebration
- **[Anniversary Demo](https://carledwards.github.io/wordclock/?date=2024-04-29)** - Special anniversary display

## ⚙️ URL Parameters

### Basic Parameters
- `?theme=terminal` - Choose a theme (default, terminal, live-terminal, dos, 16-segment, mac1984, liquid-glass)
- `?date=2024-12-25` - Set a specific date (YYYY-MM-DD format)
- `?title=My Clock` - Custom window title (works with mac1984 theme)
- `?controls=true` - Add time controls for testing

### Advanced Parameters
- `?background=IMAGE_URL` - Add custom background image
- `?family=ENCODED_JSON` - Configure family birthdays and anniversary

### Example Combinations
```
?theme=live-terminal&controls=true
?date=2024-12-25&theme=terminal
?theme=mac1984&title=My Custom Clock
```

## 🛠️ Interactive Features

- **Click "IT'S"** - Opens family configuration builder
- **Click "HAPPY"** - Shows days until special events
- **Click "O'CLOCK"** - Cycles through available themes
- **Click family names** - Shows their birthday celebration
- **Click special dates** - Temporarily shows that celebration

## 🔧 Technical Highlights

- **Pure JavaScript** - No external dependencies
- **Monospace Grid System** - Perfect character alignment across themes
- **Smart Change Detection** - Only redraws when display actually changes
- **Cache-Busting Gallery** - Always shows latest theme updates
- **Responsive Design** - Works on desktop and mobile

## 📝 License

MIT License - Feel free to use and modify for your own projects.
