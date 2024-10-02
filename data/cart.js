export const cart = [];
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
        quantity
      });
    }
}