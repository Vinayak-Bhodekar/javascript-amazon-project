export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addToOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('order', JSON.stringify(orders));
}