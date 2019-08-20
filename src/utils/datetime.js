import moment from 'moment';

export function getDate(datetime, endOfNight) {
  let nHours = parseInt(endOfNight.substr(0, 2), 10);
  const momentDate = moment(datetime);

  if (nHours === 12) {
    nHours = 0;
  }

  if (/pm/i.test(endOfNight)) {
    nHours += 12;
  }

  momentDate.subtract(nHours, 'hours');

  return momentDate.format('YYYY-MM-DD');
}

export function isSameDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) {
    return false;
  }

  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return (
    a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
  );
}
