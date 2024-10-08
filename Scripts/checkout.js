import {cart,removefromcart, update_checkout,updateQuantity} from '../data/cart.js';
import {product} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import { delieveryOptions } from '../data/delieveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((cartitem) => {
  const productId = cartitem.productId;

  let matchingproduct;

  product.forEach((value) => {
    if(value.id === productId){
      matchingproduct = value;
      }
    });

  const delieryoptionId = cartitem.delieveryOptionId;
  
  let delieveryoption;
  delieveryOptions.forEach((option) => {
    if(option.id === delieryoptionId){
      delieveryoption = option;
    }
  });

  const today = dayjs();
  const deliverydate = today.add(delieveryoption.delieveryDays,'days');
  const datestring = deliverydate.format('dddd, MMMM D');


  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
      <div class="delivery-date">
        Delivery date: ${datestring}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingproduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingproduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingproduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingproduct.id}">${cartitem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id ="${matchingproduct.id}">
              Update
            </span>
            <span class = "is-editing-quantity">
              <input class = "quantity-input quantity-input-${matchingproduct.id}" data-product-id ="${matchingproduct.id}">
              <span class = "save-quantity-link" data-product-id ="${matchingproduct.id}">Save</span>
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"  data-product-id = "${matchingproduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${delieveryoptionHTML(matchingproduct,cartitem)}
        </div>
      </div>
    </div>
  `;
});

function delieveryoptionHTML(matchingproduct,cartitem){
  let html = '';
  delieveryOptions.forEach((delieryoption) => {
    const today = dayjs();
    const deliveryday = today.add(delieryoption.delieveryDays,'days');
    const datestring = deliveryday.format('dddd, MMMM D');
    const pricestring = delieryoption.priceCents === 0 ? 'FREE' : `$${formatCurrency(delieryoption.priceCents)}`;
    const ischecked = delieryoption.id === cartitem.delieveryOptionId;
    
    html += `
        <div class="delivery-option">
            <input type="radio" ${ischecked ? 'checked':''}
              class="delivery-option-input"
              name="delivery-option-${matchingproduct.id}">
            <div>
              <div class="delivery-option-date">
              ${datestring}
              </div>
              <div class="delivery-option-price">
              ${pricestring} - Shipping
              </div>
            </div>
          </div>
    `
  });
  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId; 
    removefromcart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    update_checkout("check-out");
  });
});


document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});

document.body.addEventListener('keydown',(event) => {

  if(event.key === 'Enter' && event.target.classList.contains('quantity-input')){
    const productId = event.target.dataset.productId;
    
    update_temp(link);
  }
});

document.querySelectorAll(".save-quantity-link").forEach((link) => {
  link.addEventListener('click',() => {
    update_temp(link);
  
  });
});
function update_temp(link){
  const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    const newquantity = document.querySelector(`.quantity-input-${productId}`);
    updateQuantity(newquantity.dataset.productId,Number(newquantity.value));
}
