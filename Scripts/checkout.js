import { renderOrderSummary } from './orderSummaryRenderer.js';
import { renderpaymentsummary } from './Checkouts/paymentSummary.js';
import {renderCheckoutHeader} from './Checkouts/CheckoutHeader.js'
import '../data/cart-classes.js';
renderCheckoutHeader();
renderpaymentsummary();
renderOrderSummary();
