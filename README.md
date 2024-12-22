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

## URL Parameters

### Date Parameter
Test any date by adding a date parameter:
```
?date=YYYY-MM-DD
```

Examples:
- New Year: `?date=2024-01-01`
- Any special occasion: Replace YYYY-MM-DD with your desired date

### Theme Parameter
Choose from two classic computer themes by adding the theme parameter:
```
?theme=terminal    # Green terminal display
?theme=dos        # Classic DOS window
```

Available themes:

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

### Combining Parameters
You can combine both parameters to show special dates in terminal style:
```
?date=2024-12-25&theme=terminal
```

Examples:
- Terminal Christmas: `?date=2024-12-25&theme=terminal`
- DOS Christmas: `?date=2024-12-25&theme=dos`
- Terminal New Year: `?date=2024-01-01&theme=terminal`
- DOS New Year: `?date=2024-01-01&theme=dos`

## Technical Details
- Pure JavaScript implementation
- CSS-based styling and animations
- No external dependencies
- Configurable special dates system

## License
MIT License - Feel free to use and modify for your own projects.
