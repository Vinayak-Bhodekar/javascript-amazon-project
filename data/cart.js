export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];
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