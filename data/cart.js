export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    delieveryOptionId: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    delieveryOptionId: '1'
  }];




export function savetomemory(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart (productId) {
  let matchingItem;

    cart.forEach((item)=>{
      if(item.productId === productId){
        matchingItem = item;
      }
    });

    const quantityselector = document.querySelector(`.js-qauntity-selector-${productId}`);

    const quantity = Number(quantityselector.value);

    if(matchingItem){
      matchingItem.quantity += quantity;
    }else{
      cart.push({
        productId,
        quantity,
        delieveryOptionId: 1
      });
    }
    savetomemory();
}

export function removefromcart(productId){
  const newcart = [];
  cart.forEach((item) => {
    if (item.productId !== productId){
      newcart.push(item);
    }
  });

  cart = newcart;
  savetomemory();
}

export function update_checkout(classname){
  let cartquantity = 0;
  cart.forEach((item) => {
    cartquantity += Number(item.quantity);
  });
  if(classname === "update-cart-quantity"){
    document.querySelector(`.js-${classname}`).innerHTML = cartquantity;
  }
  else{
    document.querySelector(`.js-${classname}`).innerHTML = `${cartquantity} items`;
  }
}

export function updateQuantity(productID, newQuantity){
  if (newQuantity > 0 && newQuantity <= 1000){
    cart.forEach((item) => {
      if(item.productId === productID){
        item.quantity = newQuantity;
        update_checkout("check-out");
        renderOrderSummary();
        savetomemory();
      }
    });
  }
  
  
}

export function updateDelieveryOption(productId,delieveryOptionIds){
  let matchingItem;
  cart.forEach((item) => {
    if(item.productId === productId){
      matchingItem = item;
    }
  });
  matchingItem.delieveryOptionId = delieveryOptionIds; 

  savetomemory();
}

export function getcart_product(productID){
  let matchingproduct;
  cart.forEach((value) => {
    if(value.productId === productID){
      matchingproduct = value;
      }
    });  
  return matchingproduct;
}