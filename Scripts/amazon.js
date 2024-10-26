import {cart, addtocart,update_checkout} from '../data/cart.js';
import { product,loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
loadProducts(renderProductGrid);

function renderProductGrid() {

  let producthtml = '';
  product.forEach((value)=>{
    producthtml += `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${value.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${value.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${value.getStar()}">
              <div class="product-rating-count link-primary">
                ${value.getRate()}
              </div>
            </div>

            <div class="product-price">
              ${value.getPriceCents()}
            </div>

            <div class="product-quantity-container">
              <select class = "js-qauntity-selector-${value.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${value.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart add-opacity-${value.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${value.id}">
              Add to Cart
            </button>
          </div>
    `;
  });
  let istimerestart;
  function udatecartquantity(productId){
    let cartquantity = 0;
      cart.forEach((item)=>{
        cartquantity += item.quantity;
      });

      document.querySelector('.cart-quantity').innerHTML = cartquantity;

      update_checkout("update-cart-quantity");

      const addedmessage = document.querySelector(`.add-opacity-${productId}`);

      addedmessage.classList.add('add-opacity1');

        if(istimerestart){
          clearTimeout(istimerestart);
        }
        const timeinterval = setTimeout(() => {
          addedmessage.classList.remove('add-opacity1');
        },2000);

        istimerestart = timeinterval; 
      
  }
  document.querySelector('.products-grid').innerHTML = producthtml;

  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{

      const {productId} = button.dataset;

      addtocart(productId);
      udatecartquantity(productId);
    });
  });
}