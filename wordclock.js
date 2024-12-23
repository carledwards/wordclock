// Family configuration validation
function validateFamilyConfig(config) {
    // Check if parents exist and have required fields
    if (!config.parents?.mom?.name || !config.parents?.mom?.birthday ||
        !config.parents?.dad?.name || !config.parents?.dad?.birthday ||
        !config.parents?.anniversary) {
        throw new Error('Parents configuration must include mom and dad with names, birthdays, and anniversary date');
    }

    // Check if there are between 1 and 4 children
    if (!Array.isArray(config.children) || config.children.length < 1 || config.children.length > 4) {
        throw new Error('Must have between 1 and 4 children');
    }

    // Validate each child has required fields
    config.children.forEach((child, index) => {
        if (!child.name || !child.birthday) {
            throw new Error(`Child ${index + 1} must have name and birthday`);
        }
    });

    return true;
}

// Example family configuration
const FAMILY_CONFIG = {
    parents: {
        mom: {
            name: "Yvette",
            birthday: "1999/05/05"
        },
        dad: {
            name: "Carl",
            birthday: "1999/06/10"
        },
        anniversary: "1999/04/29"
    },
    children: [
        {
            name: "Alli",
            birthday: "1999/09/04"
        },
        {
            name: "Nick",
            birthday: "1999/07/14"
        },
        {
            name: "Liam",
            birthday: "1999/12/29"
        },
        {
            name: "Kristen",
            birthday: "1999/08/06"
        }
    ]
};

// Validate configuration on load
validateFamilyConfig(FAMILY_CONFIG);

// Function to get element ID for a family member
function getFamilyMemberElementId(role, childIndex = null) {
    if (role === 'mom' || role === 'dad') {
        return `text-${role}`;
    }
    return `text-child${childIndex + 1}`;
}

// Function to generate special dates from family config
function generateSpecialDates(config) {
    const dates = {
        // Fixed holidays
        '12-25': { // December 25
            name: 'Christmas',
            elements: ['text-merry', 'text-christmas']
        },
        '1-1': { // January 1
            name: 'New Year',
            elements: ['text-happy', 'text-new', 'text-year']
        }
    };

    // Add anniversary
    const [aYear, aMonth, aDay] = config.parents.anniversary.split('/');
    const anniversaryKey = `${parseInt(aMonth)}-${parseInt(aDay)}`;
    dates[anniversaryKey] = {
        name: 'Anniversary',
        elements: ['text-happy', 'text-anniversary', getFamilyMemberElementId('mom'), 'text-and', getFamilyMemberElementId('dad')]
    };

    // Add parents' birthdays
    for (const [role, parent] of Object.entries(config.parents)) {
        if (role !== 'anniversary') {
            const [year, month, day] = parent.birthday.split('/');
            const key = `${parseInt(month)}-${parseInt(day)}`;
            dates[key] = {
                name: `${parent.name}'s Birthday`,
                elements: ['text-happy', getFamilyMemberElementId(role), 'text-birthday']
            };
        }
    }

    // Add children's birthdays
    config.children.forEach((child, index) => {
        const [year, month, day] = child.birthday.split('/');
        const key = `${parseInt(month)}-${parseInt(day)}`;
        dates[key] = {
            name: `${child.name}'s Birthday`,
            elements: ['text-happy', getFamilyMemberElementId('child', index), 'text-birthday']
        };
    });

    return dates;
}

// Generate special dates from config
const SPECIAL_DATES = generateSpecialDates(FAMILY_CONFIG);

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
        if (!e || typeof e != "object") {
            return;
        }
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
        }, 1999)
        clock.updateTime(new Date());
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
            // Disable parent elements
            self.disableStyle('text-mom');
            self.disableStyle('text-dad');
            self.disableStyle('text-and');

            // Disable child elements
            for (let i = 1; i <= 4; i++) {
                self.disableStyle(`text-child${i}`);
            }

            // Disable other elements
            self.disableStyle('text-mothers');
            self.disableStyle('text-fathers');
            self.disableStyle('text-birthday');
            self.disableStyle('text-day');
            self.disableStyle('text-oclock');
            self.disableStyle('text-merry');
            self.disableStyle('text-new');
            self.disableStyle('text-year');
            self.disableStyle('text-christmas');

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

            // Handle special dates first
            self.handleSpecialDates(moment);

            // Get new state after all styles are applied
            const newState = Array.from(document.querySelectorAll('.clock ul li'))
                .map(li => li.className)
                .join('');

            // Only update if state changed
            if (newState !== this.currentState || this.currentState === '') {
                this.currentState = newState;
                if (this.themeManager?.getCurrentTheme()) {
                    this.themeManager.getCurrentTheme().update();
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
            controls: false,
            familyConfig: null,
            title: 'Word Clock'
        };

        if (params.has('title')) {
            result.title = decodeURIComponent(params.get('title'));
        }

        if (params.has('family')) {
            try {
                const familyJson = decodeURIComponent(params.get('family'));
                const parsedConfig = JSON.parse(familyJson);
                if (validateFamilyConfig(parsedConfig)) {
                    result.familyConfig = parsedConfig;
                }
            } catch (error) {
                console.error('Invalid family configuration:', error);
            }
        }

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

    updateTitle: function(title) {
        if (this.themeManager?.getCurrentTheme()) {
            this.themeManager.getCurrentTheme().setTitle(title);
        }
    },

    applyTheme: function(theme) {
        this.themeManager = window.themeManager;
        this.themeManager.setTheme(theme, this.getURLParams().title);
    },

    applyBackground: function(url) {
        if (url) {
            const clock = document.querySelector('.clock');
            clock.style.setProperty('--background-image', `url(${decodeURIComponent(url)})`);
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

    // Update HTML elements with family member names and remove unused elements
    updateFamilyNames: function() {
        // Update parents
        document.getElementById('text-mom').textContent = FAMILY_CONFIG.parents.mom.name.toUpperCase();
        document.getElementById('text-dad').textContent = FAMILY_CONFIG.parents.dad.name.toUpperCase();

        // Handle children elements
        for (let i = 1; i <= 4; i++) {
            const element = document.getElementById(`text-child${i}`);
            if (element) {
                if (i <= FAMILY_CONFIG.children.length) {
                    // Update child element
                    element.textContent = FAMILY_CONFIG.children[i - 1].name.toUpperCase();
                } else {
                    // Remove unused child element
                    element.parentNode.removeChild(element);
                }
            }
        }
    },

    init: function(){
        const params = clock.getURLParams();
        
        // Use URL family config if provided, otherwise use default
        if (params.familyConfig) {
            Object.assign(FAMILY_CONFIG, params.familyConfig);
            // Regenerate special dates with new config
            Object.assign(SPECIAL_DATES, generateSpecialDates(FAMILY_CONFIG));
        }
        
        // Update family member names in HTML
        this.updateFamilyNames();
        
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
            const initialDate = params.date;
            setInterval(function(){
                const now = new Date();
                // Create a new date object to avoid modifying the original
                const currentDate = new Date(initialDate);
                currentDate.setHours(now.getHours());
                currentDate.setMinutes(now.getMinutes());
                currentDate.setSeconds(now.getSeconds());
                clock.updateTime(currentDate);
            }, 1999);
            clock.updateTime(initialDate);
        } else {
            // Otherwise start the normal clock
            clock.startClock();
        }
    }
};
// Family Builder functionality
const familyBuilder = {
    showBuilder: function() {
        document.querySelector('.modal-overlay').classList.add('visible');
        document.querySelector('.family-builder').classList.add('visible');
    },

    hideBuilder: function() {
        document.querySelector('.modal-overlay').classList.remove('visible');
        document.querySelector('.family-builder').classList.remove('visible');
    },

    addChild: function(name = '', birthday = '') {
        const container = document.getElementById('childrenEntries');
        const childCount = container.children.length;
        
        if (childCount >= 4) {
            document.getElementById('childError').style.display = 'block';
            return;
        }
        
        const childEntry = document.createElement('div');
        childEntry.className = 'child-entry';
        childEntry.innerHTML = `
            <div class="input-row">
                <div class="input-group">
                    <label>Child ${childCount + 1} Name:</label>
                    <input type="text" class="childName" required value="${name}">
                </div>
                <div class="input-group">
                    <label>Child ${childCount + 1} Birthday:</label>
                    <input type="date" class="childBirthday" required value="${this.formatDateForInput(birthday)}">
                </div>
                ${childCount > 0 ? `
                <button type="button" class="remove-child" title="Remove Child">✕</button>
                ` : ''}
            </div>
        `;

        // Add click handler for remove button if present
        const removeButton = childEntry.querySelector('.remove-child');
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                childEntry.remove();
                document.getElementById('addChild').style.display = 'block';
                document.getElementById('childError').style.display = 'none';
                // Update remaining child labels
                this.updateChildLabels();
            });
        }
        
        container.appendChild(childEntry);
        
        if (childCount + 1 >= 4) {
            document.getElementById('addChild').style.display = 'none';
        }
    },

    formatDateForInput: function(dateStr) {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },

    populateForm: function() {
        // Clear existing children entries
        const container = document.getElementById('childrenEntries');
        container.innerHTML = '';

        // Populate theme select with available themes
        const themeSelect = document.getElementById('themeSelect');
        themeSelect.innerHTML = ''; // Clear existing options
        
        window.themeManager.getThemeNames().forEach(themeName => {
            const option = document.createElement('option');
            option.value = themeName;
            option.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1).replace('-', ' ');
            themeSelect.appendChild(option);
        });
        
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const currentTheme = params.get('theme');
        const currentTitle = params.get('title');
        
        // Set theme if it exists
        if (currentTheme) {
            themeSelect.value = currentTheme;
        }

        // Set title if it exists
        if (currentTitle) {
            document.getElementById('titleInput').value = decodeURIComponent(currentTitle);
        }

        // Populate parent data
        document.getElementById('momName').value = FAMILY_CONFIG.parents.mom.name;
        document.getElementById('momBirthday').value = this.formatDateForInput(FAMILY_CONFIG.parents.mom.birthday);
        document.getElementById('dadName').value = FAMILY_CONFIG.parents.dad.name;
        document.getElementById('dadBirthday').value = this.formatDateForInput(FAMILY_CONFIG.parents.dad.birthday);
        document.getElementById('anniversary').value = this.formatDateForInput(FAMILY_CONFIG.parents.anniversary);

        // Add children entries
        FAMILY_CONFIG.children.forEach(child => {
            this.addChild(child.name, child.birthday);
        });
    },

    showBuilder: function() {
        document.querySelector('.modal-overlay').classList.add('visible');
        document.querySelector('.family-builder').classList.add('visible');
        this.populateForm();
    },

    formatDate: function(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    },

    generateFamilyConfig: function() {
        const formError = document.getElementById('formError');
        formError.style.display = 'none';
        
        try {
            // Get parents data
            const config = {
                parents: {
                    mom: {
                        name: document.getElementById('momName').value,
                        birthday: this.formatDate(document.getElementById('momBirthday').value)
                    },
                    dad: {
                        name: document.getElementById('dadName').value,
                        birthday: this.formatDate(document.getElementById('dadBirthday').value)
                    },
                    anniversary: this.formatDate(document.getElementById('anniversary').value)
                },
                children: []
            };

            // Get children data
            const childEntries = document.getElementById('childrenEntries').children;
            for (let entry of childEntries) {
                const name = entry.querySelector('.childName').value;
                const birthday = entry.querySelector('.childBirthday').value;
                if (name && birthday) {
                    config.children.push({
                        name: name,
                        birthday: this.formatDate(birthday)
                    });
                }
            }

            // Validate configuration
            validateFamilyConfig(config);

            // Generate URL preserving existing parameters
            const currentUrl = new URL(window.location.href);
            const theme = document.getElementById('themeSelect').value;
            
            // Update or remove theme parameter
            if (theme) {
                currentUrl.searchParams.set('theme', theme);
            } else {
                currentUrl.searchParams.delete('theme');
            }

            // Get title if set
            const title = document.getElementById('titleInput')?.value;
            if (title) {
                currentUrl.searchParams.set('title', title);
            } else {
                currentUrl.searchParams.delete('title');
            }
            
            currentUrl.searchParams.set('family', JSON.stringify(config));
            const generatedUrl = currentUrl.toString();

            // Show and populate URL output
            const urlOutput = document.querySelector('.url-output');
            const urlInput = document.getElementById('generatedUrl');
            urlOutput.style.display = 'block';
            urlInput.value = generatedUrl;

            // Add click-to-copy functionality
            urlInput.addEventListener('click', function() {
                this.select();
                navigator.clipboard.writeText(this.value);
                const copyHint = document.querySelector('.copy-hint');
                copyHint.textContent = 'Copied!';
                setTimeout(() => {
                    copyHint.textContent = 'Click to copy';
                }, 1999);
            });

        } catch (error) {
            formError.textContent = error.message;
            formError.style.display = 'block';
        }
    },

    hideBuilder: function() {
        document.querySelector('.modal-overlay').classList.remove('visible');
        document.querySelector('.family-builder').classList.remove('visible');
        // Reset URL output
        document.querySelector('.url-output').style.display = 'none';
        document.getElementById('generatedUrl').value = '';
        document.querySelector('.copy-hint').textContent = 'Click to copy';
    },

    updateChildLabels: function() {
        const entries = document.getElementById('childrenEntries').children;
        Array.from(entries).forEach((entry, index) => {
            const nameLabel = entry.querySelector('label:first-child');
            const birthdayLabel = entry.querySelector('label:last-of-type');
            nameLabel.textContent = `Child ${index + 1} Name:`;
            birthdayLabel.textContent = `Child ${index + 1} Birthday:`;
        });
    },

    init: function() {
        // Add click handler for "IT'S"
        document.querySelector('.hl').addEventListener('click', () => this.showBuilder());

        // Add click handlers for builder buttons
        document.getElementById('addChild').addEventListener('click', () => this.addChild());
        document.getElementById('generateUrl').addEventListener('click', () => this.generateFamilyConfig());
        document.getElementById('closeBuilder').addEventListener('click', () => this.hideBuilder());
        
        // Close modal when clicking overlay
        document.querySelector('.modal-overlay').addEventListener('click', () => this.hideBuilder());
    }
};

window.onload = function(){
    clock.init();
    familyBuilder.init();
};
