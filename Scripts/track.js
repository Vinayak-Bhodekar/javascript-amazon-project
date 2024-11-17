import { productFromOrder,orders } from "../data/orders.js";
import { getproduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { product,loadProductsFetch } from "../data/products.js";

let today = dayjs();
//const deliveryDate = today.add(0, 'days');
const dateString = today.format('dddd, MMMM D');

const url = new URL(window.location.href);
const productId = (url.searchParams.get("productId"));
const orderId = (url.searchParams.get("orderId"));




async function loadpage(){
  await loadProductsFetch();
  const product = getproduct(productId);
  const order = productFromOrder(orderId);
  console.log(product,order,order.products);

  let productDetails;
  order.products.forEach(element => {
    if(element.productId === productId){
      productDetails = element;
    }
  });
  

  let delieveryTime = dayjs(productDetails.estimatedDeliveryTime);
  let orderTime = dayjs(order.orderTime);
  let  progress_percent = ((today-orderTime)/(delieveryTime-orderTime))*100;
  console.log(progress_percent);
  const html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateString}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${progress_percent < 50 ? 'current-status':''}">
            Preparing
          </div>
          <div class="progress-label ${progress_percent >=50 && progress_percent < 100} ? 'current-status':''">
            Shipped
          </div>
          <div class="progress-label ${progress_percent >= 100 ? 'current-status':''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${progress_percent}%;"></div>
        </div>
  `;
  
document.querySelector(".js-order-tracking").innerHTML = html;



}
loadpage();