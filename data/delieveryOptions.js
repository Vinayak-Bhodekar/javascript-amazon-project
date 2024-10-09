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