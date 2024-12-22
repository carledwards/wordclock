// Special dates configuration
const SPECIAL_DATES = {
    // Fixed dates
    '4-29': { // April 29
        name: 'Anniversary',
        elements: ['text-happy', 'text-anniversary', 'text-yvette', 'text-and', 'text-carl']
    },
    '5-5': { // May 5
        name: "Yvette's Birthday",
        elements: ['text-happy', 'text-yvette', 'text-birthday']
    },
    '6-10': { // June 10
        name: "Carl's Birthday",
        elements: ['text-happy', 'text-carl', 'text-birthday']
    },
    '7-14': { // July 14
        name: "Nick's Birthday",
        elements: ['text-happy', 'text-nick', 'text-birthday']
    },
    '9-4': { // September 4
        name: "Alli's Birthday",
        elements: ['text-happy', 'text-alli', 'text-birthday']
    },
    '12-25': { // December 25
        name: 'Christmas',
        elements: ['text-merry', 'text-christmas']
    },
    '1-1': { // January 1
        name: 'New Year',
        elements: ['text-happy', 'text-new', 'text-year']
    },
    '12-29': { // December 29
        name: "Liam's Birthday",
        elements: ['text-happy', 'text-birthday', 'text-liam']
    },
    '8-6': { // August 6
        name: "Kristen's Birthday",
        elements: ['text-happy', 'text-birthday', 'text-kristen']
    }
};

// Dynamic special dates
const DYNAMIC_DATES = {
    "Father's Day": {
        elements: ['text-happy', 'text-fathers', 'text-day'],
        getDate: (year) => {
            const date = new Date(year, 5, 1); // June 1st
            date.setDate(date.getDay() === 0 ? 15 : 22 - date.getDay());
            return date;
        }
    },
    "Mother's Day": {
        elements: ['text-happy', 'text-mothers', 'text-day'],
        getDate: (year) => {
            const date = new Date(year, 4, 1); // May 1st
            date.setDate(date.getDay() === 0 ? 8 : 15 - date.getDay());
            return date;
        }
    }
};

var clock = {
    currentState: '', // Track current state for change detection
    
    disableStyle: function(elementReference){
        var e = document.getElementById(elementReference);
        if (!e || typeof e != "object") 
            return;
        e.className = 'norm';
    },
    enableStyle: function(elementReference){
        var e = document.getElementById(elementReference);
        if (!e || typeof e != "object") 
            return;
        e.className = 'hl';
    },
    enableOccasionStyle: function(elementReference){
        var e = document.getElementById(elementReference);
        if (!e || typeof e != "object") 
            return;
        e.className = 'ho';
    },
    // Helper method to enable multiple elements with occasion style
    enableElements: function(elements) {
        elements.forEach(element => this.enableOccasionStyle(element));
    },

    // Helper method to check and handle special dates
    handleSpecialDates: function(moment) {
        const mo = moment.getMonth() + 1;
        const da = moment.getDate();
        const yr = moment.getFullYear();
        
        // Check fixed special dates
        const dateKey = `${mo}-${da}`;
        const specialDate = SPECIAL_DATES[dateKey];
        if (specialDate) {
            this.enableElements(specialDate.elements);
            return true;
        }

        // Check dynamic dates
        const currentDate = new Date(yr, mo-1, da, 0, 0, 0, 0).getTime();
        for (const [name, config] of Object.entries(DYNAMIC_DATES)) {
            if (currentDate === config.getDate(yr).getTime()) {
                this.enableElements(config.elements);
                return true;
            }
        }

        return false;
    },
    
    startClock: function(){
        setInterval(function(){
            clock.updateTime(new Date());
        }, 2000)
        clock.updateTime(new Date());
    },

    initCursor: function() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.querySelector('.clock').appendChild(cursor);
        this.cursor = cursor;
    },

    // Draw the entire display with cursor animation
    animateCursor: function(callback) {
        if (!this.cursor) return callback();

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

        // Get all elements in DOM order (naturally left-to-right, top-to-bottom)
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
                callback();
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
    },

    updateTime: function(moment){
        const self = this;
        const updateDisplay = () => {
            // First apply all styles
            for (i = 1; i <= 12; i++) {
                self.disableStyle('h' + i);
            }    

            var h = moment.getHours();
            var m = moment.getMinutes();
            var mo = moment.getMonth() + 1;
            var da = moment.getDate();
            var yr = moment.getYear();

            if (h >= 12) {
                h = h-12;
            }
            if (h == 0) {
                h = 12;
            }            

            if (m > 34) {
                h = h+1;
            }
            if (h > 12) {
                h = 1;
            }
                        
            if (h == 1) {
                self.disableStyle('h12');
            }
            else {
                self.disableStyle('h' + (h - 1));
            }
            self.enableStyle('h' + h);

            self.disableStyle('text-half');
            self.disableStyle('text-ten');
            self.disableStyle('text-quarter');
            self.disableStyle('text-twenty');
            self.disableStyle('text-five');
            self.disableStyle('text-minutes');
            self.disableStyle('text-to');
            self.disableStyle('text-past');
            self.disableStyle('text-happy');
            self.disableStyle('text-anniversary');
            self.disableStyle('text-yvette');
            self.disableStyle('text-and');
            self.disableStyle('text-carl');
            self.disableStyle('text-nick');
            self.disableStyle('text-alli');
            self.disableStyle('text-mothers');
            self.disableStyle('text-fathers');
            self.disableStyle('text-birthday');
            self.disableStyle('text-day');
            self.disableStyle('text-oclock');
            self.disableStyle('text-merry');
            self.disableStyle('text-new');
            self.disableStyle('text-year');
            self.disableStyle('text-christmas');
            self.disableStyle('text-liam');
            self.disableStyle('text-kristen');

            if (m < 5) {
                self.enableStyle('text-oclock');
            }
            else {
                if (m < 35) {
                    self.enableStyle('text-past');
                }
                else {
                    self.enableStyle('text-to');
                }
                if (m < 10) {
                    self.enableStyle('text-five');
                    self.enableStyle('text-minutes');
                }
                else if (m < 15) {
                    self.enableStyle('text-ten');
                    self.enableStyle('text-minutes');
                }
                else if (m < 20) {
                    self.enableStyle('text-quarter');
                }
                else if (m < 25) {
                    self.enableStyle('text-twenty');
                    self.enableStyle('text-minutes');
                }
                else if (m < 30) {
                    self.enableStyle('text-twenty');
                    self.enableStyle('text-five');
                    self.enableStyle('text-minutes');
                }
                else if (m < 35) {
                    self.enableStyle('text-half');
                }
                else if (m < 40) {
                    self.enableStyle('text-twenty');
                    self.enableStyle('text-five');
                    self.enableStyle('text-minutes');
                }
                else if (m < 45) {
                    self.enableStyle('text-twenty');
                    self.enableStyle('text-minutes');
                }
                else if (m < 50) {
                    self.enableStyle('text-quarter');
                }
                else if (m < 55) {
                    self.enableStyle('text-ten');
                    self.enableStyle('text-minutes');
                }
                else if (m < 60) {
                    self.enableStyle('text-five');
                    self.enableStyle('text-minutes');
                }
            }

            // Handle special dates
            self.handleSpecialDates(moment);

            // Get new state after all styles are applied
            const newState = Array.from(document.querySelectorAll('.clock ul li'))
                .map(li => li.className)
                .join('');

            // Only animate if state changed
            if (newState !== this.currentState || this.currentState === '') {
                this.currentState = newState;
                if (this.cursor) {
                    this.animateCursor(() => {});
                }
            }
        };

        updateDisplay();
    },

    getURLParams: function() {
        const params = new URLSearchParams(window.location.search);
        const result = {
            date: null,
            theme: null,
            background: null,
            controls: false
        };

        if (params.has('date')) {
            const [year, month, day] = params.get('date').split('-').map(Number);
            if (year && month && day) {
                const now = new Date();
                result.date = new Date(year, month - 1, day, 
                    now.getHours(), 
                    now.getMinutes(), 
                    now.getSeconds()
                );
            }
        }

        if (params.has('theme')) {
            result.theme = params.get('theme').toLowerCase();
        }

        if (params.has('background')) {
            result.background = params.get('background');
        }

        if (params.has('controls')) {
            result.controls = params.get('controls');
        }

        return result;
    },

    applyTheme: function(theme) {
        if (theme === 'terminal' || theme === 'dos' || theme === 'live-terminal') {
            document.body.classList.add(theme);
            if (theme === 'live-terminal') {
                this.initCursor();
            }
        }
    },

    applyBackground: function(url) {
        if (url) {
            const clock = document.querySelector('.clock');
            clock.style.backgroundImage = `url(${decodeURIComponent(url)})`;
            document.body.classList.add('has-background');
        }
    },
    
    initTimeControls: function() {
        const controls = document.querySelector('.time-controls');
        const timeInput = document.getElementById('timeInput');
        const resetButton = document.getElementById('resetTime');
        
        // Show controls
        controls.classList.add('visible');
        
        // Set initial time
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        timeInput.value = timeStr;
        
        // Handle time input changes
        timeInput.addEventListener('change', () => {
            const [hours, minutes] = timeInput.value.split(':').map(Number);
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            this.updateTime(date);
        });
        
        // Handle reset button
        resetButton.addEventListener('click', () => {
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            timeInput.value = timeStr;
            this.updateTime(now);
        });
    },

    init: function(){
        const params = clock.getURLParams();
        
        // Apply theme if specified
        if (params.theme) {
            clock.applyTheme(params.theme);
        }

        // Apply background if specified
        if (params.background) {
            clock.applyBackground(params.background);
        }

        // Initialize time controls if enabled
        if (params.controls === 'true') {
            this.initTimeControls();
            // Initial time update
            const [hours, minutes] = document.getElementById('timeInput').value.split(':').map(Number);
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            this.updateTime(date);
        } else if (params.date) {
            // Handle date parameter
            setInterval(function(){
                const now = new Date();
                // Update the custom date with current time
                params.date.setHours(now.getHours());
                params.date.setMinutes(now.getMinutes());
                params.date.setSeconds(now.getSeconds());
                clock.updateTime(params.date);
            }, 2000);
            clock.updateTime(params.date);
        } else {
            // Otherwise start the normal clock
            clock.startClock();
        }
    }
};
window.onload = function(){
    clock.init();
};
