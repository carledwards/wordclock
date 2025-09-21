/* Sixteen-Segment LED Theme (Based on anthonyec/16seg approach)
   Renders each character inside .clock li elements as a 16-segment LED glyph.
   - Uses body class "sixteen-segment" (added by ThemeManager) to style via themes/16-segment.css
   - Integrates with existing Theme system in themes/theme.js
   - Uses inline SVG with predefined segment polygons
*/

(function() {
  // Base class fallback if not already defined
  if (typeof Theme === 'undefined') {
    class Theme { constructor(name){ this.name = name; } init(){} update(){} setTitle(){} cleanup(){} }
    window.Theme = Theme;
  }

  // SVG template for 16-segment display (based on provided SVG)
  const SVG_TEMPLATE = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330.1 444.5" class="glyph">
<g id="seg0"><polygon points="1.1,417.3 34,245.8 53.5,228.2 66,243.6 35.1,405.2 10.6,426.8"/></g>
<g id="seg1"><polygon points="43.1,199.4 73,28.7 84.5,16.2 103,36.7 74.1,199.2 55.6,215.8"/></g>
<g id="seg2"><polygon points="109.8,31 92.3,12.5 104.7,1 185.3,1 198.8,15.5 180.4,31"/></g>
<g id="seg3"><polygon points="224.7,32 209.3,16.6 229.7,1 307.3,1 315.8,9.5 289.4,32"/></g>
<g id="seg4"><polygon points="265.1,201.4 297,38.8 319.5,17.2 329,28.6 296.1,198.2 277.6,215.8"/></g>
<g id="seg5"><polygon points="228.1,408.3 256,245.7 273.6,227.2 288,240.7 258.1,415.2 244.6,426.8"/></g>
<g id="seg6"><polygon points="146.8,443 134.3,427.6 152.7,414 219.3,414 237.8,432.5 226.3,443"/></g>
<g id="seg7"><polygon points="23.2,443.5 15.8,436 39.2,414.5 109.3,414 120.8,426.5 103.3,444"/></g>
<g id="seg8"><polygon points="51,352.7 128.9,243.9 160.4,225.7 125.1,300.3 72.2,374.2 44.2,399.2"/></g>
<g id="seg9"><polygon points="73.3,237.5 60.7,222.1 77.2,207.5 140.9,207.5 158.2,220.9 129.9,237.5"/></g>
<g id="seg10"><polygon points="141,201.2 100.1,88.5 107.9,42.6 126.1,63.8 155,152.6 161.9,218.3"/></g>
<g id="seg11"><polygon points="161,150.5 183,39.8 202.5,22.2 217,36.7 194.1,153.3 165.9,209.7"/></g>
<g id="seg12"><polygon points="208,138.7 257.9,69.8 287.8,43.8 280.1,89.3 202.2,198.1 169.7,216.3"/></g>
<g id="seg13"><polygon points="191.2,237.5 172.9,222.1 198.2,207.5 257.8,207.5 269.3,220 249.8,237.5"/></g>
<g id="seg14"><polygon points="205,378.3 175,292.4 169.1,226.7 187.1,241.8 230,357.6 224.2,402.3"/></g>
<g id="seg15"><polygon points="116.1,406.4 135,293.6 163.2,232.4 168,285.5 148.1,404.2 128.6,420.8"/></g>
<g id="seg16"><circle cx="297" cy="427" r="16.5"/></g>
</svg>`;

  // Character to segments mapping (from reference implementation)
  const FONT = {
    ' ': [],
    '.': [16],
    "'": [11], // Using segment 11 for apostrophe
    'A': [0, 1, 2, 3, 4, 5, 9, 13],
    'B': [2, 3, 4, 5, 6, 7, 11, 13, 15],
    'C': [0, 1, 2, 3, 6, 7],
    'D': [2, 3, 4, 5, 6, 7, 11, 15],
    'E': [0, 1, 2, 3, 6, 7, 9],
    'F': [0, 1, 2, 3, 9],
    'G': [0, 1, 2, 3, 5, 6, 7, 13],
    'H': [0, 1, 4, 5, 9, 13],
    'I': [2, 3, 6, 7, 11, 15],
    'J': [0, 4, 5, 6, 7],
    'K': [0, 1, 9, 12, 14],
    'L': [0, 1, 6, 7],
    'M': [0, 1, 4, 5, 10, 12],
    'N': [0, 1, 4, 5, 10, 14],
    'O': [0, 1, 2, 3, 4, 5, 6, 7],
    'P': [0, 1, 2, 3, 4, 9, 13],
    'Q': [0, 1, 2, 3, 4, 5, 6, 7, 14],
    'R': [0, 1, 2, 3, 4, 9, 13, 14],
    'S': [2, 3, 5, 6, 7, 10, 13],
    'T': [2, 3, 11, 15],
    'U': [0, 1, 4, 5, 6, 7],
    'V': [0, 1, 8, 12],
    'W': [0, 1, 4, 5, 8, 14],
    'X': [8, 10, 12, 14],
    'Y': [1, 4, 9, 13, 15],
    'Z': [2, 3, 6, 7, 8, 12],
    '&': [9, 11, 13, 15], // Ampersand as a '+'
    '-': [9, 13], // Dash using center horizontal segments
    '0': [0, 1, 2, 3, 4, 5, 6, 7, 8, 12],
    '1': [4, 5, 11],
    '2': [2, 3, 4, 6, 7, 9, 13],
    '3': [2, 3, 4, 5, 6, 7, 13],
    '4': [0, 1, 4, 5, 9, 13],
    '5': [0, 1, 2, 3, 5, 6, 7, 13],
    '6': [0, 1, 2, 3, 5, 6, 7, 9, 13],
    '7': [2, 3, 4, 5],
    '8': [0, 1, 2, 3, 4, 5, 6, 7, 9, 13],
    '9': [0, 1, 2, 3, 4, 5, 6, 7, 13]
  };

  function createSegmentDisplay(svgElement, options = {}) {
    const defaultOptions = { 
      inactiveOpacity: 0.1,
      activeOpacity: 1.0
    };
    const opts = { ...defaultOptions, ...options };

    const groups = svgElement.querySelectorAll('g');
    const segments = Array.from(groups).map((group) => {
      return group.querySelector('polygon') || group.querySelector('circle');
    });

    const display = {
      clear: function() {
        segments.forEach((segment) => {
          if (segment) {
            // Don't set fill - let CSS handle colors
            segment.style.opacity = opts.inactiveOpacity;
          }
        });
      },

      show: function(char) {
        const pattern = FONT[char.toUpperCase()] || [];
        
        this.clear();
        
        pattern.forEach((segIndex) => {
          if (segments[segIndex]) {
            // Don't set fill - let CSS handle colors
            segments[segIndex].style.opacity = opts.activeOpacity;
          }
        });
      }
    };

    display.clear();
    return display;
  }

  function renderLiToLED(li) {
    // Preserve original text
    if (!li.dataset.plain) {
      li.dataset.plain = (li.textContent || '').trim();
    }
    const text = li.dataset.plain;
    
    // Clear and render
    while (li.firstChild) li.removeChild(li.firstChild);

    const wrap = document.createElement('div');
    wrap.className = 'led16-mono';

    // Create a digit slot for every character (including spaces)
    const chars = (text || '').split('');
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const digitSlot = document.createElement('div');
      digitSlot.className = 'digit-slot';
      
      // Always create an SVG, even for spaces
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = SVG_TEMPLATE;
      const svg = tempDiv.firstElementChild;
      
      // Create display controller and show character (spaces will show nothing)
      const display = createSegmentDisplay(svg);
      display.show(ch);
      
      digitSlot.appendChild(svg);
      wrap.appendChild(digitSlot);
    }

    li.appendChild(wrap);
  }

  function restoreLiFromLED(li) {
    if (li && li.dataset && typeof li.dataset.plain === 'string') {
      li.textContent = li.dataset.plain;
      delete li.dataset.plain;
    }
  }

  function calculateFullJustification() {
    // Get all rows and calculate their content
    const rows = Array.from(document.querySelectorAll('.clock ul'));
    let maxColumns = 0;
    
    // Calculate the longest row
    rows.forEach(row => {
      const words = Array.from(row.querySelectorAll('li')).map(li => li.dataset.plain || li.textContent.trim());
      const totalChars = words.reduce((sum, word) => sum + word.length, 0);
      const minSpaces = Math.max(0, words.length - 1); // At least one space between words
      const rowLength = totalChars + minSpaces;
      maxColumns = Math.max(maxColumns, rowLength);
    });
    
    return maxColumns;
  }

  function renderRowWithJustification(row, maxColumns) {
    const lis = Array.from(row.querySelectorAll('li'));
    const wordData = lis.map(li => ({
      text: li.dataset.plain || li.textContent.trim(),
      className: li.className,
      id: li.id // Preserve IDs for word clock functionality
    }));
    
    // Calculate total character count and required spaces
    const totalChars = wordData.reduce((sum, word) => sum + word.text.length, 0);
    const minSpaces = Math.max(0, wordData.length - 1);
    const extraSpaces = maxColumns - totalChars - minSpaces;
    
    // Distribute extra spaces between words
    const spacesPerGap = wordData.length > 1 ? Math.floor(extraSpaces / (wordData.length - 1)) : 0;
    const remainderSpaces = wordData.length > 1 ? extraSpaces % (wordData.length - 1) : extraSpaces;
    
    // Clear the row and rebuild with justified spacing
    row.innerHTML = '';
    
    wordData.forEach((wordInfo, index) => {
      // Create li for the word
      const li = document.createElement('li');
      li.className = wordInfo.className; // Preserve original classes
      if (wordInfo.id) li.id = wordInfo.id; // Preserve original ID
      li.dataset.plain = wordInfo.text;
      
      // Render the word as LED
      renderLiToLED(li);
      row.appendChild(li);
      
      // Add spaces after each word except the last
      if (index < wordData.length - 1) {
        const baseSpaces = 1 + spacesPerGap;
        const extraSpace = index < remainderSpaces ? 1 : 0;
        const totalSpaces = baseSpaces + extraSpace;
        
        // Create space characters
        for (let i = 0; i < totalSpaces; i++) {
          const spaceLi = document.createElement('li');
          spaceLi.className = 'norm'; // Spaces are always normal
          spaceLi.dataset.plain = ' ';
          renderLiToLED(spaceLi);
          row.appendChild(spaceLi);
        }
      }
    });
  }

  class SixteenSegmentTheme extends Theme {
    constructor() {
      super('sixteen-segment');
      this._rendered = false;
    }

    init() {
      // Calculate full justification
      const maxColumns = calculateFullJustification();
      
      // Set CSS grid columns for all rows
      const rows = document.querySelectorAll('.clock ul');
      rows.forEach(row => {
        row.style.gridTemplateColumns = `repeat(${maxColumns}, 1fr)`;
        renderRowWithJustification(row, maxColumns);
      });
      
      this._rendered = true;

      // Ensure title bar compatibility if present
      const macMenuBar = document.querySelector('.mac-menubar');
      if (macMenuBar) {
        macMenuBar.style.display = 'none';
      }
    }

    setTitle(title) {
      // No special title bar for this theme
    }

    update() {
      // No per-tick re-render needed; highlight classes (norm/hl/ho) already affect segment color via CSS.
    }

    cleanup() {
      if (!this._rendered) return;
      const lis = document.querySelectorAll('.clock ul li');
      lis.forEach(restoreLiFromLED);
      this._rendered = false;
    }
  }

  // Expose class globally for theme manager to construct
  window.SixteenSegmentTheme = SixteenSegmentTheme;
})();
