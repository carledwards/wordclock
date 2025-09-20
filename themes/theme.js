// Base Theme interface
class Theme {
    constructor(name) {
        this.name = name;
    }

    init() {
        // Default initialization
    }

    update() {
        // Default update behavior
    }

    setTitle(title) {
        // Default title behavior
    }

    cleanup() {
        // Cleanup when switching themes
    }
}

// Live Terminal Theme
class LiveTerminalTheme extends Theme {
    constructor() {
        super('live-terminal');
        this.cursor = null;
    }

    init() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.querySelector('.clock').appendChild(this.cursor);
    }

    update() {
        // Redraw with cursor animation
        if (!this.cursor) return;

        const clock = document.querySelector('.clock');
        
        // Clear screen instantly
        clock.classList.add('clearing');
        
        // Hide all elements initially
        document.querySelectorAll('.clock ul li').forEach(li => {
            li.classList.add('hidden');
        });

        // Start cursor at top left
        this.cursor.classList.add('moving');
        this.cursor.style.left = '0.4rem';
        this.cursor.style.top = '0.4rem';
        this.cursor.style.right = '';
        this.cursor.style.bottom = '';

        clock.classList.remove('clearing');

        // Get all elements in DOM order
        const elements = Array.from(document.querySelectorAll('.clock ul li'));
        let currentElement = 0;

        const drawNext = () => {
            if (currentElement >= elements.length) {
                // Drawing complete, move cursor to bottom right
                this.cursor.style.left = '';
                this.cursor.style.right = '0.4rem';
                this.cursor.style.top = '';
                this.cursor.style.bottom = '0.4rem';
                this.cursor.classList.remove('moving');
                return;
            }

            const element = elements[currentElement];
            const rect = element.getBoundingClientRect();
            const clockRect = clock.getBoundingClientRect();

            // Move cursor to element position
            const relativeLeft = ((rect.left - clockRect.left) / clockRect.width) * 100;
            const relativeTop = ((rect.top - clockRect.top) / clockRect.height) * 100;
            this.cursor.style.left = `${relativeLeft - 0.2}%`;
            this.cursor.style.top = `${relativeTop + 0.2}%`;

            // Show element after cursor arrives
            setTimeout(() => {
                element.classList.remove('hidden');
                currentElement++;
                setTimeout(drawNext, 15);
            }, 15);
        };

        drawNext();
    }

    cleanup() {
        if (this.cursor) {
            this.cursor.remove();
            this.cursor = null;
        }
    }
}

// Mac 1984 Theme
class Mac1984Theme extends Theme {
    constructor() {
        super('mac1984');
    }

    init() {
        const macMenuBar = document.querySelector('.mac-menubar');
        if (macMenuBar) {
            macMenuBar.style.display = 'block';
        }
    }

    setTitle(title) {
        const titleBar = document.querySelector('.clock .clock-title-bar');
        if (titleBar) {
            titleBar.style.setProperty('--title-text', `'${title}'`);
        }
    }

    cleanup() {
        const macMenuBar = document.querySelector('.mac-menubar');
        if (macMenuBar) {
            macMenuBar.style.display = 'none';
        }
    }
}

// Terminal Theme
class TerminalTheme extends Theme {
    constructor() {
        super('terminal');
    }
}

// DOS Theme
class DOSTheme extends Theme {
    constructor() {
        super('dos');
    }
}

/* Liquid Glass Theme */
class LiquidGlassTheme extends Theme {
    constructor() {
        super('liquid-glass');
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.themes = {
            'default': new Theme('default'),
            'live-terminal': new LiveTerminalTheme(),
            'mac1984': new Mac1984Theme(),
            'terminal': new TerminalTheme(),
            'dos': new DOSTheme(),
            'liquid-glass': new LiquidGlassTheme()
        };
        this.currentTheme = null;
    }

    getThemeNames() {
        return Object.keys(this.themes);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(themeName, title = 'Word Clock') {
        // Cleanup previous theme
        if (this.currentTheme) {
            this.currentTheme.cleanup();
        }

        // Remove any existing theme classes
        document.body.classList.remove(...this.getThemeNames());
        
        // Set new theme
        const theme = this.themes[themeName] || this.themes['default'];
        document.body.classList.add(theme.name);
        
        // Initialize new theme
        theme.init();
        theme.setTitle(title);
        
        this.currentTheme = theme;
        return theme;
    }
}

// Make themeManager globally available
window.themeManager = new ThemeManager();
