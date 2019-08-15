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
