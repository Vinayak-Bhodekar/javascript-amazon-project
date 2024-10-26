import { renderOrderSummary } from './orderSummaryRenderer.js';
import { renderpaymentsummary } from './Checkouts/paymentSummary.js';
import {renderCheckoutHeader} from './Checkouts/CheckoutHeader.js'
//import '../data/car.js';
//import '../data/cart-classes.js';
import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';


loadProducts(() => {
  renderCheckoutHeader();
  renderpaymentsummary();
  renderOrderSummary();
});

