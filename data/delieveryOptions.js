import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const delieveryOptions = [{
  id: '1',
  delieveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  delieveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  delieveryDays: 1,
  priceCents: 999
}];

export function getDelieveryOption(delieryoptionId){
  let delieveryoptionss;
  delieveryOptions.forEach((option) => {
    if(option.id == delieryoptionId){
      delieveryoptionss = option;
    }
  });
  return delieveryoptionss || delieveryOptions[0];
}
function isweekend (date){
  const dayofweek = date.format('dddd');
  return dayofweek === 'Saturday' || dayofweek === 'Sunday';
}


export function calculateDeliveryDate(delieveryoptionss){
  let remaindays = delieveryoptionss.delieveryDays;
  let delieverdays = dayjs();
  
  while(remaindays>0){
    delieverdays = delieverdays.add(1,'day');

    if(!isweekend(delieverdays)){
      remaindays--;
    }
  }
    
    const datestring = delieverdays.format('dddd, MMMM D');
    return datestring;
}