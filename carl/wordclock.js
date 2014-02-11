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
    
    startClock: function(){
    	for (i = 1; i <= 12; i++) {
			clock.disableStyle('h' + i);
    	}    
        function updateTime(){
            var moment = new Date();
			var h = moment.getHours();
		    var m = moment.getMinutes();
		    var mo = moment.getMonth() + 1;
		    var da = moment.getDate();

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
 
 			if (m < 5) {
 				clock.disableStyle('text-half');
 				clock.disableStyle('text-ten');
 				clock.disableStyle('text-quarter');
 				clock.disableStyle('text-twenty');
 				clock.disableStyle('text-five');
 				clock.disableStyle('text-minutes');
 				clock.disableStyle('text-to');
 				clock.disableStyle('text-past');
 				clock.enableStyle('text-oclock');
 			}
 			else {
 				clock.disableStyle('text-oclock');
 				if (m < 35) {
	 				clock.disableStyle('text-to');
	 				clock.enableStyle('text-past');
 				}
 				else {
	 				clock.enableStyle('text-to');
	 				clock.disableStyle('text-past');
 				}
 				if (m < 10) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
	 				clock.disableStyle('text-ten');
					clock.enableStyle('text-five');
 					clock.enableStyle('text-minutes');
 				}
 				else if (m < 15) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
					clock.disableStyle('text-five');
	 				clock.enableStyle('text-ten');
 					clock.enableStyle('text-minutes');
 				}
 				else if (m < 20) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-twenty');
					clock.disableStyle('text-five');
	 				clock.disableStyle('text-ten');
 					clock.disableStyle('text-minutes');
					clock.enableStyle('text-quarter');
 				}
 				else if (m < 25) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
					clock.disableStyle('text-five');
	 				clock.disableStyle('text-ten');
					clock.enableStyle('text-twenty');
 					clock.enableStyle('text-minutes');
 				}
 				else if (m < 30) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
	 				clock.disableStyle('text-ten');
					clock.enableStyle('text-twenty');
					clock.enableStyle('text-five');
 					clock.enableStyle('text-minutes');
 				}
 				else if (m < 35) {
 					clock.disableStyle('text-minutes');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
	 				clock.disableStyle('text-ten');
					clock.disableStyle('text-twenty');
					clock.disableStyle('text-five');
					clock.enableStyle('text-half');
 				}
 				else if (m < 40) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
	 				clock.disableStyle('text-ten');
					clock.enableStyle('text-twenty');
					clock.enableStyle('text-five');
 					clock.enableStyle('text-minutes');
 				}
 				else if (m < 45) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
					clock.disableStyle('text-five');
	 				clock.disableStyle('text-ten');
					clock.enableStyle('text-twenty');
 					clock.enableStyle('text-minutes');
 				}
 				else if (m < 50) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-twenty');
					clock.disableStyle('text-five');
	 				clock.disableStyle('text-ten');
 					clock.disableStyle('text-minutes');
					clock.enableStyle('text-quarter');
 				}
 				else if (m < 55) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
					clock.disableStyle('text-five');
	 				clock.enableStyle('text-ten');
 					clock.enableStyle('text-minutes');
 				}
 				else if (m < 60) {
					clock.disableStyle('text-half');
					clock.disableStyle('text-quarter');
					clock.disableStyle('text-twenty');
	 				clock.disableStyle('text-ten');
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
				clock.disableStyle('text-nick');
				clock.disableStyle('text-alli');
				clock.disableStyle('text-mothers');
				clock.disableStyle('text-fathers');
				clock.disableStyle('text-birthday');
				clock.disableStyle('text-day');
			}
			else if (mo == 5 && da == 5) {
				clock.enableOccasionStyle('text-happy');
				clock.disableStyle('text-anniversary');
				clock.enableOccasionStyle('text-yvette');
				clock.disableStyle('text-and');
				clock.disableStyle('text-carl');
				clock.disableStyle('text-nick');
				clock.disableStyle('text-alli');
				clock.disableStyle('text-mothers');
				clock.disableStyle('text-fathers');
				clock.enableOccasionStyle('text-birthday');
				clock.disableStyle('text-day');
			}
			else if (mo == 6 && da == 16) {
				clock.enableOccasionStyle('text-happy');
				clock.disableStyle('text-anniversary');
				clock.disableStyle('text-yvette');
				clock.disableStyle('text-and');
				clock.disableStyle('text-carl');
				clock.disableStyle('text-nick');
				clock.disableStyle('text-alli');
				clock.disableStyle('text-mothers');
				clock.enableOccasionStyle('text-fathers');
				clock.disableStyle('text-birthday');
				clock.enableOccasionStyle('text-day');
			}
			else if (mo == 5 && da == 12) {
				clock.enableOccasionStyle('text-happy');
				clock.disableStyle('text-anniversary');
				clock.disableStyle('text-yvette');
				clock.disableStyle('text-and');
				clock.disableStyle('text-carl');
				clock.disableStyle('text-nick');
				clock.disableStyle('text-alli');
				clock.enableOccasionStyle('text-mothers');
				clock.disableStyle('text-fathers');
				clock.disableStyle('text-birthday');
				clock.enableOccasionStyle('text-day');
			}
			else if (mo == 6 && da == 10) {
				clock.enableOccasionStyle('text-happy');
				clock.disableStyle('text-anniversary');
				clock.disableStyle('text-yvette');
				clock.disableStyle('text-and');
				clock.enableOccasionStyle('text-carl');
				clock.disableStyle('text-nick');
				clock.disableStyle('text-alli');
				clock.disableStyle('text-mothers');
				clock.disableStyle('text-fathers');
				clock.enableOccasionStyle('text-birthday');
				clock.disableStyle('text-day');
			}
			else if (mo == 7 && da == 14) {
				clock.enableOccasionStyle('text-happy');
				clock.disableStyle('text-anniversary');
				clock.disableStyle('text-yvette');
				clock.disableStyle('text-and');
				clock.disableStyle('text-carl');
				clock.enableOccasionStyle('text-nick');
				clock.disableStyle('text-alli');
				clock.disableStyle('text-mothers');
				clock.disableStyle('text-fathers');
				clock.enableOccasionStyle('text-birthday');
				clock.disableStyle('text-day');
			}
			else if (mo == 9 && da == 4) {
				clock.enableOccasionStyle('text-happy');
				clock.disableStyle('text-anniversary');
				clock.disableStyle('text-yvette');
				clock.disableStyle('text-and');
				clock.disableStyle('text-carl');
				clock.disableStyle('text-nick');
				clock.enableOccasionStyle('text-alli');
				clock.disableStyle('text-mothers');
				clock.disableStyle('text-fathers');
				clock.enableOccasionStyle('text-birthday');
				clock.disableStyle('text-day');
			}
			else {
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
			}
            
            setTimeout(function(){
                updateTime();
            }, 2000)
        }
        updateTime();
        
    },
    init: function(){
        clock.startClock();
    }
};
window.onload = function(){
    clock.init();
};
