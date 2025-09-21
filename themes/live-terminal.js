/* Live Terminal Theme with Monospace Grid
   Combines the animated cursor functionality with perfect character alignment.
   Uses the shared MonospaceGrid system for consistent spacing.
*/

(function() {
  // Base class fallback if not already defined
  if (typeof Theme === 'undefined') {
    class Theme { constructor(name){ this.name = name; } init(){} update(){} setTitle(){} cleanup(){} }
    window.Theme = Theme;
  }

  // Character renderer for live terminal theme
  function renderLiveTerminalCharacter(li) {
    // Preserve original text
    if (!li.dataset.plain) {
      li.dataset.plain = (li.textContent || '').trim();
    }
    const text = li.dataset.plain;
    
    // Clear and render
    while (li.firstChild) li.removeChild(li.firstChild);

    // Create individual character spans for grid alignment
    const chars = (text || '').split('');
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const charSpan = document.createElement('span');
      charSpan.className = 'mono-char';
      charSpan.textContent = ch;
      li.appendChild(charSpan);
    }
  }

  function restoreLiveTerminalCharacter(li) {
    if (li && li.dataset && typeof li.dataset.plain === 'string') {
      li.textContent = li.dataset.plain;
      delete li.dataset.plain;
    }
  }

  class LiveTerminalTheme extends Theme {
    constructor() {
      super('live-terminal');
      this._rendered = false;
      this._animationComplete = false;
      this._blinkInterval = null;
      this._animationInProgress = false;
      this._animationTimeouts = [];
    }

    init() {
      // Apply monospace grid with live terminal character renderer
      if (window.MonospaceGrid) {
        window.MonospaceGrid.applyMonospaceGrid('live-terminal', renderLiveTerminalCharacter);
      } else {
        // Fallback: just render characters without grid
        const lis = document.querySelectorAll('.clock ul li');
        lis.forEach(li => renderLiveTerminalCharacter(li));
      }
      
      this._rendered = true;

      // Hide Mac menu bar for terminal theme
      const macMenuBar = document.querySelector('.mac-menubar');
      if (macMenuBar) {
        macMenuBar.style.display = 'none';
      }
    }

    update() {
      // If animation is complete, check if we need to restart for new time
      if (this._animationComplete) {
        // For now, just maintain the blinking cursor
        // In the future, we could detect time changes and restart animation
        if (!this._blinkInterval) {
          this.addBlinkingCursor();
        }
        return;
      }

      // If animation is in progress, cancel it and start fresh with new time
      if (this._animationInProgress) {
        this._animationInProgress = false;
        this._animationComplete = false;
      }

      // Clear all existing timeouts from previous animation
      this._animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
      this._animationTimeouts = [];

      // Clear any existing blink interval
      if (this._blinkInterval) {
        clearInterval(this._blinkInterval);
        this._blinkInterval = null;
      }

      // Mark animation as in progress
      this._animationInProgress = true;

      // Redraw with flowing cursor animation
      const clock = document.querySelector('.clock');
      
      // Clear screen instantly
      clock.classList.add('clearing');

      // Get all character spans in reading order (row by row)
      const rows = Array.from(document.querySelectorAll('.clock ul'));
      const allChars = [];
      
      rows.forEach(row => {
        const rowChars = Array.from(row.querySelectorAll('.mono-char'));
        allChars.push(...rowChars);
      });

      // Store original characters and hide all initially
      allChars.forEach(char => {
        if (!char.dataset.originalChar) {
          char.dataset.originalChar = char.textContent;
        }
        char.textContent = ' '; // Start with spaces
        char.style.visibility = 'visible';
        char.style.opacity = '1';
      });

      clock.classList.remove('clearing');

      let currentChar = 0;

      const typeNext = () => {
        if (currentChar >= allChars.length) {
          // Animation complete - add blinking cursor at end of last line
          this._animationComplete = true;
          this._animationInProgress = false;
          this.addBlinkingCursor();
          return;
        }

        const char = allChars[currentChar];
        const originalChar = char.dataset.originalChar;
        
        // Show cursor at current position with bright green color
        char.textContent = '█';
        char.classList.add('cursor-char');
        
        // After a brief pause, replace cursor with actual character
        const timeout1 = setTimeout(() => {
          char.classList.remove('cursor-char');
          char.textContent = originalChar;
          currentChar++;
          const timeout2 = setTimeout(typeNext, 25); // Typing speed
          this._animationTimeouts.push(timeout2);
        }, 20); // Cursor display time
        this._animationTimeouts.push(timeout1);
      };

      // Start typing after a brief delay
      const initialTimeout = setTimeout(typeNext, 200);
      this._animationTimeouts.push(initialTimeout);
    }

    addBlinkingCursor() {
      // Remove any existing cursor first
      const existingCursor = document.querySelector('.live-terminal-cursor');
      if (existingCursor) {
        existingCursor.remove();
      }

      // Find the last non-space character in the grid
      const rows = Array.from(document.querySelectorAll('.clock ul'));
      const allChars = [];
      
      rows.forEach(row => {
        const rowChars = Array.from(row.querySelectorAll('.mono-char'));
        allChars.push(...rowChars);
      });

      // Find the last non-space character
      let lastCharIndex = allChars.length - 1;
      while (lastCharIndex >= 0 && allChars[lastCharIndex].textContent.trim() === '') {
        lastCharIndex--;
      }

      // Position cursor right after the last character
      if (lastCharIndex >= 0 && lastCharIndex < allChars.length - 1) {
        const cursorChar = allChars[lastCharIndex + 1];
        cursorChar.textContent = '█';
        cursorChar.classList.add('cursor-char', 'live-terminal-cursor');
        
        // Make it blink and store the interval
        this._blinkInterval = setInterval(() => {
          if (cursorChar.style.opacity === '0') {
            cursorChar.style.opacity = '1';
          } else {
            cursorChar.style.opacity = '0';
          }
        }, 500); // Blink every 500ms
      }
    }

    setTitle(title) {
      // Live terminal theme doesn't use title bar
    }

    cleanup() {
      if (!this._rendered) return;
      
      // Clear blink interval
      if (this._blinkInterval) {
        clearInterval(this._blinkInterval);
        this._blinkInterval = null;
      }
      
      // Remove cursor element
      const existingCursor = document.querySelector('.live-terminal-cursor');
      if (existingCursor) {
        existingCursor.remove();
      }
      
      // Reset animation state
      this._animationComplete = false;
      this._animationInProgress = false;
      
      // Use shared cleanup if available
      if (window.MonospaceGrid) {
        window.MonospaceGrid.cleanup();
      } else {
        // Fallback cleanup
        const lis = document.querySelectorAll('.clock ul li');
        lis.forEach(restoreLiveTerminalCharacter);
      }
      
      this._rendered = false;
    }
  }

  // Expose class globally for theme manager to construct
  window.LiveTerminalTheme = LiveTerminalTheme;
})();
