import differenceInYears from 'date-fns/differenceInYears';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInDays from 'date-fns/differenceInCalendarDays';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import addYears from 'date-fns/addYears';
import addMonths from 'date-fns/addMonths';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';

export const getRemainingTime = endDate => {
  let x = new Date();

  let temp;
  temp = differenceInYears(endDate, x);
  let result = `${temp} years `;
  x = addYears(x, temp);
  temp = differenceInMonths(endDate, x);
  result = `${result + temp} months `;
  x = addMonths(x, temp);
  temp = differenceInDays(endDate, x);
  result = `${result + temp} days `;
  x = addDays(x, temp);
  temp = differenceInHours(endDate, x);
  result = `${result + temp} hours `;
  x = addHours(x, temp);
  temp = differenceInMinutes(endDate, x);
  result = `${result + temp} minutes `;
  x = addMinutes(x, temp);
  temp = differenceInSeconds(endDate, x);
  result = `${result + temp} seconds`;

  return result;
};

export const formatDate = () => {};
