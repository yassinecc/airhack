
function buildDateFromText(hourMinute){

    let d = new Date(); // creates a Date Object using the clients current time

    let [hours,minutes] = hourMinute.split(':');

    d.setHours(hours);
    d.setMinutes(minutes);

    return d;
}

function compareDates(date1, date2){

    return date1 > date2;
}

