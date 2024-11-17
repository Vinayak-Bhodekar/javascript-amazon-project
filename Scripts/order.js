import { addToOrder, orders, productFromOrder} from "../data/orders.js";
import { currentDate } from "./utils/currentdate.js";
import { formatCurrency } from "./utils/money.js";
import { getproduct,loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addtocartOrder,cart } from "../data/cart.js";
import { cartTOorder } from "./Checkouts/paymentsummary.js";

console.log(orders);
async function loadpage(){
  await loadProductsFetch();
  let orderss = '';
  orders.forEach((value) => {
    
    function product_grid(order){
      let html = '';
      order.products.forEach((product) => {
        console.log(product);
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
          <button class="buy-again-button button-primary js-order-button" data-product-id = "${productfromcart.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
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
  
}

async function handleBuyAgain(productId) {
  const item = productFromOrder(productId);
  const newProduct = [{
    productId: productId,
    quantity: 1,
    delieveryOptionId: '1'
  }];
  
  await cartTOorder(newProduct);
  addtocartOrder(productId);
}

// Use event delegation to handle clicks on the buy-again buttons
document.body.addEventListener('click', async (event) => {
  const button = event.target.closest('.js-order-button');
  button.innerHTML = "Added";
  if (button) {
    await handleBuyAgain(button.dataset.productId);
  }
  loadpage();
  setTimeout(() => {
    button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
    `;
  },2000);
});

loadpage();
