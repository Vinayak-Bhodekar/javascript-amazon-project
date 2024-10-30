import { renderOrderSummary } from './orderSummaryRenderer.js';
import { renderpaymentsummary } from './Checkouts/paymentsummary.js';
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
  try {
    //throw 'error123';
    await loadProductsFetch();

    await new Promise((resolve,reject) => {
      loadCart(() => {
        //reject('error1234');
        resolve('value2');
    });
  });
  } 
  catch(error) {
    console.log('Unexpected error. Please try again',error);
  }
  

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
