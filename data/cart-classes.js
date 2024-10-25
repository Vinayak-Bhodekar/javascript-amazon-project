class Cart  {
  cartItems= undefined;
  localStorageKey = undefined;


  constructor(localStorageKeyname) {
    this.localStorageKey = localStorageKeyname;
    this.LoadFromStorage();
  }


  LoadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      delieveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      delieveryOptionId: '1'
    }];
  }


  savetomemory(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }


  addtocart (productId) {
    let matchingItem;
    
      this.cartItems.forEach((item)=>{
        if(item.productId === productId){
          matchingItem = item;
        }
      });
    /*
      const quantityselector = document.querySelector(`.js-qauntity-selector-${productId}`);
      console.log(productId);
      const quantity = Number(quantityselector.value);
    */
      if(matchingItem){
        matchingItem.quantity += 1;
      }else{
        this.cartItems.push({
          productId,
          quantity: 1,
          delieveryOptionId: 1
        });
      }
      this.savetomemory();
  }


  removefromcart(productId){
    const newcart = [];
    this.cartItems.forEach((item) => {
      if (item.productId !== productId){
        newcart.push(item);
      }
    });
    
    this.cartItems = newcart;
    savetomemory();
  }


  update_checkout(classname){
    let cartquantity = 0;
    this.cartItems.forEach((item) => {
      cartquantity += Number(item.quantity);
    });
    if(classname === "update-cart-quantity"){
      document.querySelector(`.js-${classname}`).innerHTML = cartquantity;
    }
    else{
      document.querySelector(`.js-${classname}`).innerHTML = `${cartquantity} items`;
    }
  }


  updateQuantity(productID, newQuantity){
    if (newQuantity > 0 && newQuantity <= 1000){
      this.cartItems.forEach((item) => {
        if(item.productId === productID){
          item.quantity = newQuantity;
          update_checkout("check-out");
          renderOrderSummary();
          savetomemory();
        }
      });
    }
  }


  updateDelieveryOption(productId,delieveryOptionIds){
    let matchingItem;
    this.cartItems.forEach((item) => {
      if(item.productId === productId){
        matchingItem = item;
      }
    });
    matchingItem.delieveryOptionId = delieveryOptionIds; 
    
    savetomemory();
  }


  getcart_product(productID){
    let matchingproduct;
    this.cartItems.forEach((value) => {
      if(value.productId === productID){
        matchingproduct = value;
        }
      });  
    return matchingproduct;
    }

}


const cart = new Cart();
const bussinessCart = new Cart();
