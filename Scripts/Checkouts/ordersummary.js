import {cart,removefromcart, update_checkout,updateQuantity,updateDelieveryOption} from '../../data/cart.js';
import {product,getproduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { delieveryOptions , getDelieveryOption, calculateDeliveryDate} from '../../data/delieveryOptions.js';
import { renderpaymentsummary } from './paymentsummary.js';
import { renderCheckoutHeader } from './CheckoutHeader.js';



export function renderOrderSummary(){
let cartSummaryHTML = '';

  cart.forEach((cartitem) => {
    const productId = cartitem.productId;

    let matchingproduct = getproduct(cartitem.productId);

    

    const delieryoptionId = cartitem.delieveryOptionId;
    
    let delieveryoptionss = getDelieveryOption(delieryoptionId);
    
    
    
    


    
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
          Delivery date: ${calculateDeliveryDate(delieveryoptionss)}
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
      const ischecked = delieryoption.id == cartitem.delieveryOptionId;
      
      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id = ${matchingproduct.id}
          data-delievery-option-id = ${delieryoption.id}>
              <input type="radio" ${ischecked ? 'checked':''}
                class="delivery-option-input"
                name="delivery-option-${matchingproduct.id}">
              <div>
                <div class="delivery-option-date">
                ${calculateDeliveryDate(delieryoption)}
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
      update_checkout("check-out");
      renderCheckoutHeader();
      renderOrderSummary();
      renderpaymentsummary();
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

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener('click',() => {
      const {productId , delieveryOptionId} = option.dataset;
      updateDelieveryOption(productId , delieveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();