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
    updateTime: function(moment){
    	for (i = 1; i <= 12; i++) {
			clock.disableStyle('h' + i);
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
            clock.disableStyle('h12');
        }
        else {
            clock.disableStyle('h' + (h - 1));
        }
        clock.enableStyle('h' + h);

        clock.disableStyle('text-half');
        clock.disableStyle('text-ten');
        clock.disableStyle('text-quarter');
        clock.disableStyle('text-twenty');
        clock.disableStyle('text-five');
        clock.disableStyle('text-minutes');
        clock.disableStyle('text-to');
        clock.disableStyle('text-past');
        clock.disableStyle('text-happy');
        clock.disableStyle('text-anniversary');
        clock.disableStyle('text-yvette');
        clock.disableStyle('text-and');
        clock.disableStyle('text-carl');
        clock.disableStyle('text-nick');
        clock.disableStyle('text-alli');
        clock.disableStyle('text-mothers');
        clock.disableStyle('text-fathers');
        clock.disableStyle('text-birthday');
        clock.disableStyle('text-day');
        clock.disableStyle('text-oclock');
        clock.disableStyle('text-merry');
        clock.disableStyle('text-new');
        clock.disableStyle('text-year');
        clock.disableStyle('text-christmas');
        clock.disableStyle('text-liam');
        clock.disableStyle('text-kristen');

        if (m < 5) {
            clock.enableStyle('text-oclock');
        }
        else {
            if (m < 35) {
                clock.enableStyle('text-past');
            }
            else {
                clock.enableStyle('text-to');
            }
            if (m < 10) {
                clock.enableStyle('text-five');
                clock.enableStyle('text-minutes');
            }
            else if (m < 15) {
                clock.enableStyle('text-ten');
                clock.enableStyle('text-minutes');
            }
            else if (m < 20) {
                clock.enableStyle('text-quarter');
            }
            else if (m < 25) {
                clock.enableStyle('text-twenty');
                clock.enableStyle('text-minutes');
            }
            else if (m < 30) {
                clock.enableStyle('text-twenty');
                clock.enableStyle('text-five');
                clock.enableStyle('text-minutes');
            }
            else if (m < 35) {
                clock.enableStyle('text-half');
            }
            else if (m < 40) {
                clock.enableStyle('text-twenty');
                clock.enableStyle('text-five');
                clock.enableStyle('text-minutes');
            }
            else if (m < 45) {
                clock.enableStyle('text-twenty');
                clock.enableStyle('text-minutes');
            }
            else if (m < 50) {
                clock.enableStyle('text-quarter');
            }
            else if (m < 55) {
                clock.enableStyle('text-ten');
                clock.enableStyle('text-minutes');
            }
            else if (m < 60) {
                clock.enableStyle('text-five');
                clock.enableStyle('text-minutes');
            }
        }

        // Handle special dates
        this.handleSpecialDates(moment);
    },
    getURLParams: function() {
        const params = new URLSearchParams(window.location.search);
        const result = {
            date: null,
            theme: null,
            background: null
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

        return result;
    },

    applyTheme: function(theme) {
        if (theme === 'terminal' || theme === 'dos') {
            document.body.classList.add(theme);
        }
    },

    applyBackground: function(url) {
        if (url) {
            const clock = document.querySelector('.clock');
            clock.style.backgroundImage = `url(${decodeURIComponent(url)})`;
            document.body.classList.add('has-background');
        }
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

        // Handle date parameter
        if (params.date) {
            // If date parameter exists, start clock with that date
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
