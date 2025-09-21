/* DOS Theme with Monospace Grid
   Applies DOS styling with perfect character alignment and full justification.
   Uses the shared MonospaceGrid system for consistent spacing.
*/

(function() {
  // Base class fallback if not already defined
  if (typeof Theme === 'undefined') {
    class Theme { constructor(name){ this.name = name; } init(){} update(){} setTitle(){} cleanup(){} }
    window.Theme = Theme;
  }

  // Character renderer for DOS theme
  function renderDOSCharacter(li) {
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

  function restoreDOSCharacter(li) {
    if (li && li.dataset && typeof li.dataset.plain === 'string') {
      li.textContent = li.dataset.plain;
      delete li.dataset.plain;
    }
  }

  class DOSTheme extends Theme {
    constructor() {
      super('dos');
      this._rendered = false;
    }

    init() {
      // Apply monospace grid with DOS character renderer
      if (window.MonospaceGrid) {
        window.MonospaceGrid.applyMonospaceGrid('dos', renderDOSCharacter);
      } else {
        // Fallback: just render characters without grid
        const lis = document.querySelectorAll('.clock ul li');
        lis.forEach(li => renderDOSCharacter(li));
      }
      
      this._rendered = true;

      // Hide Mac menu bar for DOS theme
      const macMenuBar = document.querySelector('.mac-menubar');
      if (macMenuBar) {
        macMenuBar.style.display = 'none';
      }
    }

    setTitle(title) {
      // DOS theme doesn't use title bar
    }

    update() {
      // No per-tick re-render needed; highlight classes already affect colors via CSS
    }

    cleanup() {
      if (!this._rendered) return;
      
      // Use shared cleanup if available
      if (window.MonospaceGrid) {
        window.MonospaceGrid.cleanup();
      } else {
        // Fallback cleanup
        const lis = document.querySelectorAll('.clock ul li');
        lis.forEach(restoreDOSCharacter);
      }
      
      this._rendered = false;
    }
  }

  // Expose class globally for theme manager to construct
  window.DOSTheme = DOSTheme;
})();
