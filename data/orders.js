export let orders = JSON.parse(localStorage.getItem('order')) || [];

export function addToOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

export function productFromOrder(productID) {
  let matchingProduct;
  orders.forEach(element => {
    if(element.id === productID){
      
      matchingProduct = element;
    } 
  });
  return matchingProduct;
}
function saveToStorage() {
  localStorage.setItem('order', JSON.stringify(orders));
}