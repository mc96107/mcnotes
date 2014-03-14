/** set up custom event handling demo using provided API hooks **/
document.addEventListener('DOMComponentsLoaded', function(){
// the dictionary of iso datestring keys mapped to event data
var DATE_INFO = {};
// the currently displayed date
var CURR_ISO = null;

// aliases for DOM manipulation
var eventsCal = document.querySelector("x-calendar");
//var eventsDateHeader = document.getElementById("scheduler-date");
//var eventsInfo = document.getElementById("scheduler-info");
//var eventsSaveButton = document.getElementById("scheduler-save");

// define a .customRenderFn that provides extra styling 
// information for day elements with stored data
eventsCal.customRenderFn = function(dayEl, date, isoStr){
    if(isoStr === CURR_ISO){
        xtag.addClass(dayEl, "scheduler-current");
    }
    else{
        xtag.removeClass(dayEl, "scheduler-current");
    }

    if(indxarr.indexOf(isoStr.split('-').join('/')+'.md')!=-1){
        dayEl.setAttribute("scheduler-has-info", true);
    }
    else{
        dayEl.removeAttribute("scheduler-has-info");
    }
}

// respond to calendar taps
eventsCal.addEventListener("datetap", function(e){
    // grab date info from event as both a Date and a string
    var date = e.detail.date;
    var dateStr = e.detail.iso;
	
    // get dictionary content for this date
    /*var content = (dateStr && dateStr in DATE_INFO) ? 
                                    DATE_INFO[dateStr] : "";*/
    // set up text area                                                
    //eventsInfo.value = content;
    //eventsInfo.disabled = !dateStr;
   // eventsSaveButton.disabled = !dateStr;
    // remember currently shown date
    CURR_ISO = dateStr;//console.log(CURR_ISO);
	remoteStorage.mcnotes.readFile(dateStr.split('-').join('/'));
    //eventsDateHeader.textContent = (dateStr) ? dateStr : "None";
    // programmatically toggle date object with .toggleDateOn
    eventsCal.toggleDateOn(date);
    // forces rerender of calendar
    eventsCal.render();
});
/*
// save button listener; simply adds textarea value to data
eventsSaveButton.addEventListener("click", function(e){
    if(CURR_ISO){
        if(eventsInfo.value){
            DATE_INFO[CURR_ISO] = eventsInfo.value;
        }
        else{
            delete DATE_INFO[CURR_ISO];
        }
    }
    eventsCal.render();
});
*/
});