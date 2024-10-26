import { renderOrderSummary } from './orderSummaryRenderer.js';
import { renderpaymentsummary } from './Checkouts/paymentSummary.js';
import {renderCheckoutHeader} from './Checkouts/CheckoutHeader.js'
//import '../data/car.js';
//import '../data/cart-classes.js';
//import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('Values1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderpaymentsummary();
  renderOrderSummary();
});

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then((values) => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderCheckoutHeader();
  renderpaymentsummary();
  renderOrderSummary();
});

/*loadProducts(() => {
  renderCheckoutHeader();
  renderpaymentsummary();
  renderOrderSummary();
});
*/
