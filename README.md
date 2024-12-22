# Word Clock

A unique digital clock that displays time using illuminated words instead of traditional numbers. This implementation adds an interesting twist by incorporating special date recognition, transforming the display for holidays and special occasions.

## Live Demo
[View the Word Clock](https://carledwards.github.io/wordclock/)

## Concept
The word clock presents time in a natural language format, illuminating specific words to form readable phrases like "IT'S HALF PAST TWO" or "IT'S QUARTER TO FIVE". This creates an engaging and artistic way to display time, blending functionality with visual appeal.

## Features
- Natural language time display
- Smooth transitions between time phrases
- Special date recognition with unique color highlighting
- Screen-like display with subtle visual effects
- Mobile-responsive design

## Live Demos

### Regular Time Display
[View the Word Clock](https://carledwards.github.io/wordclock/) - Shows the current time in natural language

### Special Occasion Demos
Experience how the display transforms for special occasions:

- [Merry Christmas](https://carledwards.github.io/wordclock/?date=2024-12-25) - Watch the display illuminate "MERRY CHRISTMAS" in festive colors
- [Happy Anniversary](https://carledwards.github.io/wordclock/?date=2024-04-29) - See the special anniversary celebration display
- [Adventure Time Birthday](https://carledwards.github.io/wordclock/?date=2024-09-04&background=https://variety.com/wp-content/uploads/2024/06/TCDADTI_CA002.jpg?w=1000&h=667&crop=1) - See Alli's birthday with a custom background

## URL Parameters

### Date Parameter
Test any date by adding a date parameter:
```
?date=YYYY-MM-DD
```

Examples:
- New Year: `?date=2024-01-01`
- Any special occasion: Replace YYYY-MM-DD with your desired date

### Background Image Parameter
Add a custom background image to the clock display:
```
?background=IMAGE_URL
```

The background image will be contained within the clock display, and the text will have enhanced visibility with shadows.

### Theme Parameter
Choose from several classic computer themes by adding the theme parameter:
```
?theme=terminal       # Green terminal display
?theme=live-terminal # Animated terminal display
?theme=dos           # Classic DOS window
?theme=mac1984       # Classic Macintosh display
```

Available themes:

#### Mac 1984 Theme
- Classic Macintosh window with title bar and stripes
- Black text on white background
- Window-style close button
- Classic Mac menu bar
- Custom window title support

#### Live Terminal Theme
- Terminal-style display with animated cursor
- Cursor draws text left-to-right, top-to-bottom
- Full screen redraw on updates
- Blinking cursor in bottom right when idle
- Time controls available for testing

#### Terminal Theme
- Classic green monospace text
- Yellow highlights for special occasions
- Terminal-style border with subtle glow
- Black background with green accents

#### DOS Theme
- Classic blue background with white text
- Original color scheme for special occasions
- DOS window-style border with 3D effect
- Monospace font for authentic DOS look

### Family Parameter
Configure family information for special dates (birthdays, anniversary):
```
?family=ENCODED_JSON
```

Example JSON structure before encoding:
```json
{
  "parents": {
    "mom": {
      "name": "Jane",
      "birthday": "1980/05/15"
    },
    "dad": {
      "name": "John",
      "birthday": "1978/08/22"
    },
    "anniversary": "2000/06/30"
  },
  "children": [
    {
      "name": "Alice",
      "birthday": "2010/03/10"
    },
    {
      "name": "Bob",
      "birthday": "2012/11/25"
    }
  ]
}
```

Example encoded URL parameter:
```
?family=%7B%22parents%22%3A%7B%22mom%22%3A%7B%22name%22%3A%22Jane%22%2C%22birthday%22%3A%221980%2F05%2F15%22%7D%2C%22dad%22%3A%7B%22name%22%3A%22John%22%2C%22birthday%22%3A%221978%2F08%2F22%22%7D%2C%22anniversary%22%3A%222000%2F06%2F30%22%7D%2C%22children%22%3A%5B%7B%22name%22%3A%22Alice%22%2C%22birthday%22%3A%222010%2F03%2F10%22%7D%2C%7B%22name%22%3A%22Bob%22%2C%22birthday%22%3A%222012%2F11%2F25%22%7D%5D%7D
```

Note: Use the URL builder (click "IT'S") to easily generate the encoded URL with your family configuration.

### Title Parameter
Customize the window title (works with mac1984 theme):
```
?title=Your Custom Title
```
The default title is "Word Clock" if not specified.

### URL Builder
Click on the word "IT'S" in the display to open the URL builder. This tool allows you to:
- Select a theme
- Set a custom title (for mac1984 theme)
- Configure family information
- Generate a shareable URL with your settings

### Time Controls Parameter
Add interactive time controls to test different times (works with any theme):
```
?controls=true
```
This adds a time input widget at the top of the display.

### Combining Parameters
You can combine multiple parameters to create unique displays:
```
?date=YYYY-MM-DD&theme=THEME&background=IMAGE_URL&controls=true
```

Examples:
- Live Terminal with Controls: `?theme=live-terminal&controls=true`
- Terminal Christmas: `?date=2024-12-25&theme=terminal`
- DOS Christmas: `?date=2024-12-25&theme=dos`
- Terminal New Year: `?date=2024-01-01&theme=terminal`
- DOS New Year: `?date=2024-01-01&theme=dos`
- Adventure Time Birthday: `?date=2024-09-04&background=https://variety.com/wp-content/uploads/2024/06/TCDADTI_CA002.jpg?w=1000&h=667&crop=1` - Shows Alli's birthday with an Adventure Time background

## Technical Details
- Pure JavaScript implementation
- CSS-based styling and animations
- No external dependencies
- Configurable special dates system

## License
MIT License - Feel free to use and modify for your own projects.
