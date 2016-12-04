var clock = {
    hour_num: 1,
    min_num: 0,
    sec_num: null,
    
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
    getFathersDayForYear: function(year){
        var date = new Date(year, 5, 1, 0, 0, 0, 0);
        var day = date.getDay();
        if (day == 0) {
            date.setDate(15);
        }
        else {
            date.setDate(22-date.getDay());
        }
        return date;
    },
    getMothersDayForYear: function(year){
        var date = new Date(year, 4, 1, 0, 0, 0, 0);
        var day = date.getDay();
        if (day == 0) {
            date.setDate(8);
        }
        else {
            date.setDate(15-date.getDay());
        }
        return date;
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

        if (mo == 4 && da == 29) {
            clock.enableOccasionStyle('text-happy');
            clock.enableOccasionStyle('text-anniversary');
            clock.enableOccasionStyle('text-yvette');
            clock.enableOccasionStyle('text-and');
            clock.enableOccasionStyle('text-carl');
        }
        else if (mo == 5 && da == 5) {
            clock.enableOccasionStyle('text-happy');
            clock.enableOccasionStyle('text-yvette');
            clock.enableOccasionStyle('text-birthday');
        }
        else if (new Date(yr, mo-1, da, 0, 0, 0, 0).getTime() === clock.getFathersDayForYear(yr).getTime()) {
            clock.enableOccasionStyle('text-happy');
            clock.enableOccasionStyle('text-fathers');
            clock.enableOccasionStyle('text-day');
        }
        else if (new Date(yr, mo-1, da, 0, 0, 0, 0).getTime() === clock.getMothersDayForYear(yr).getTime()) {
            clock.enableOccasionStyle('text-happy');
            clock.enableOccasionStyle('text-mothers');
            clock.enableOccasionStyle('text-day');
        }
        else if (mo == 6 && da == 10) {
            clock.enableOccasionStyle('text-happy');
            clock.enableOccasionStyle('text-carl');
            clock.enableOccasionStyle('text-birthday');
        }
        else if (mo == 7 && da == 14) {
            clock.enableOccasionStyle('text-happy');
            clock.enableOccasionStyle('text-nick');
            clock.enableOccasionStyle('text-birthday');
        }
        else if (mo == 9 && da == 4) {
            clock.enableOccasionStyle('text-happy');
            clock.enableOccasionStyle('text-alli');
            clock.enableOccasionStyle('text-birthday');
        }
    },
    init: function(){
        clock.startClock();
    }
};
window.onload = function(){
    clock.init();
};
