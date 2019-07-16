const moment = require('moment');

function buildDateFromText(hourMinute) {
  let d = new Date(); // creates a Date Object using the clients current time

  let [hours, minutes] = hourMinute.split(':');

  d.setHours(hours);
  d.setMinutes(minutes);

  return d;
}

function compareDates(date1, date2) {
  return date1 > date2;
}

function addTimes(time1, time2) {
  return moment()
    .hour(time1.getHour())
    .minute(time1.getMinute())
    .add(time2.getHour(), 'hours')
    .add(time2.getMinute(), 'minutes')
    .format('HH:mm');
}

function addCheckInTime(time) {
  return moment()
    .hour(time.getHour())
    .minute(time.getMinute())
    .add(30, 'minutes');
}

module.exports = {
  buildDateFromText: buildDateFromText,
  compareDates: compareDates,
  addTimes: addTimes,
  addCheckInTime: addCheckInTime,
};
