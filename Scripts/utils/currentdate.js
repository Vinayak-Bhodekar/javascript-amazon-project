import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function currentDate(value){
  const today = dayjs();
  const newdate = today.add(value,'day');
  const currentdate = newdate.format('MMMM D');
  return currentdate;
}
