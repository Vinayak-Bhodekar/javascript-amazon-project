import { renderOrderSummary } from './orderSummaryRenderer.js';
import { renderpaymentsummary } from './Checkouts/paymentSummary.js';
import {renderCheckoutHeader} from './Checkouts/CheckoutHeader.js'
//import '../data/car.js';
//import '../data/cart-classes.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from '../data/cart.js';

/*Promise.all([
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
*/

async function loadPage() {
  console.log('LOAd page');
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  });

  renderCheckoutHeader();
  renderpaymentsummary();
  renderOrderSummary();



  return "valueeeeee123";
}
loadPage().then((value) => {
  console.log('start next step',value);
});
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })
]).then(() => {
  renderCheckoutHeader();
  renderpaymentsummary();
  renderOrderSummary();
});
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  });
}).then((value) => {
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
