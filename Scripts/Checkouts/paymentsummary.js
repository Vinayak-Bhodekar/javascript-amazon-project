import { getproduct} from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { getDelieveryOption } from "../../data/delieveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderpaymentsummary (){
  let priceCents = 0;
  let ShippingPriceCents = 0;
  let quantity = 0;
  cart.forEach((cartitem) => {
    const product = getproduct(cartitem.productId);
    priceCents += product.priceCents * cartitem.quantity;
    quantity += cartitem.quantity;

    const delieveryoption = getDelieveryOption(cartitem.delieveryOptionId);
    ShippingPriceCents += delieveryoption.priceCents;
  });
  
  const beforetaxcents = priceCents+ShippingPriceCents;
  const taxcents = beforetaxcents * 0.1;
  const totalcents = taxcents + beforetaxcents;
  const paymentsummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(priceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(ShippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(beforetaxcents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxcents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalcents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentsummaryHTML;
}