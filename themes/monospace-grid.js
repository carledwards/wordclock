/* Shared Monospace Grid System
   Provides full justification and perfect character alignment for terminal-style themes.
   Can be applied to any theme that needs monospaced grid layout.
*/

(function() {
  // Shared monospace grid functionality
  window.MonospaceGrid = {
    
    calculateFullJustification: function() {
      // Get all rows and calculate their content
      const rows = Array.from(document.querySelectorAll('.clock ul'));
      let maxColumns = 0;
      
      // Calculate the longest row
      rows.forEach(row => {
        const words = Array.from(row.querySelectorAll('li')).map(li => 
          li.dataset.plain || li.textContent.trim()
        ).filter(word => word.length > 0); // Filter out empty elements
        const totalChars = words.reduce((sum, word) => sum + word.length, 0);
        const minSpaces = Math.max(0, words.length - 1); // At least one space between words
        const rowLength = totalChars + minSpaces;
        maxColumns = Math.max(maxColumns, rowLength);
      });
      
      return maxColumns;
    },

    renderRowWithJustification: function(row, maxColumns, renderCharacter) {
      const lis = Array.from(row.querySelectorAll('li'));
      const wordData = lis.map(li => ({
        text: li.dataset.plain || li.textContent.trim(),
        className: li.className,
        id: li.id // Preserve IDs for word clock functionality
      })).filter(word => word.text.length > 0); // Filter out empty elements
      
      // Calculate total character count and required spaces
      const totalChars = wordData.reduce((sum, word) => sum + word.text.length, 0);
      const minSpaces = Math.max(0, wordData.length - 1);
      const extraSpaces = maxColumns - totalChars - minSpaces - 1; // Reserve one space for end of line
      
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
        
        // Render the word using provided character renderer
        if (renderCharacter) {
          renderCharacter(li);
        } else {
          li.textContent = wordInfo.text; // Fallback to plain text
        }
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
            
            if (renderCharacter) {
              renderCharacter(spaceLi);
            } else {
              spaceLi.textContent = ' '; // Fallback to plain text
            }
            row.appendChild(spaceLi);
          }
        }
      });
      
      // Add end-of-line space for cursor positioning
      const endSpaceLi = document.createElement('li');
      endSpaceLi.className = 'norm'; // End space is always normal
      endSpaceLi.dataset.plain = ' ';
      
      if (renderCharacter) {
        renderCharacter(endSpaceLi);
      } else {
        endSpaceLi.textContent = ' '; // Fallback to plain text
      }
      row.appendChild(endSpaceLi);
    },

    applyMonospaceGrid: function(themeClass, renderCharacter = null) {
      // Calculate full justification based on filtered (non-empty) elements
      const rows = Array.from(document.querySelectorAll('.clock ul'));
      let maxColumns = 0;
      
      // Calculate the longest row after filtering empty elements
      rows.forEach(row => {
        const lis = Array.from(row.querySelectorAll('li'));
        const words = lis.map(li => li.dataset.plain || li.textContent.trim())
                         .filter(word => word.length > 0);
        const totalChars = words.reduce((sum, word) => sum + word.length, 0);
        const minSpaces = Math.max(0, words.length - 1);
        const rowLength = totalChars + minSpaces + 1; // +1 for end-of-line space
        maxColumns = Math.max(maxColumns, rowLength);
      });
      
      // Set CSS grid columns for all rows
      rows.forEach(row => {
        row.style.gridTemplateColumns = `repeat(${maxColumns}, 1fr)`;
        this.renderRowWithJustification(row, maxColumns, renderCharacter);
      });
      
      // Add grid CSS classes
      document.body.classList.add('monospace-grid');
    },

    cleanup: function() {
      // Remove grid styling and restore original content
      const rows = document.querySelectorAll('.clock ul');
      rows.forEach(row => {
        row.style.gridTemplateColumns = '';
        const lis = Array.from(row.querySelectorAll('li'));
        lis.forEach(li => {
          if (li.dataset.plain) {
            li.textContent = li.dataset.plain;
            delete li.dataset.plain;
          }
        });
      });
      
      document.body.classList.remove('monospace-grid');
    }
  };
})();
