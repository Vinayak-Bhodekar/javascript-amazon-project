import { orders } from "../data/orders.js";
import { currentDate } from "./utils/currentdate.js";
import { formatCurrency } from "./utils/money.js";
import { getproduct,loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadpage(){
  await loadProductsFetch();
  let orderss = '';
  orders.forEach((value) => {
    
    function product_grid(order){
      let html = '';
      order.products.forEach((product) => {
        const productfromcart = getproduct(product.productId);
        html += `
          <div class="product-image-container">
          <img src=${productfromcart.image}>
        </div>

        <div class="product-details">
          <div class="product-name">${productfromcart.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-order-button">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
        `;
      });
      return html;
    }
    

    orderss += `<div class="order-container">
              
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${currentDate(0)}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(value.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${value.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${product_grid(value)}
      </div>
    </div>`;
  });
  document.querySelector(".orders-grid").innerHTML = orderss;
  document.querySelectorAll(".js-order-button").forEach((button) => {
    button.addEventListener('click', () => {
      
    });
  });
}

loadpage();
