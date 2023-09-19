// import { Router } from "express";
// const router: Router = Router();
// import isAuthenticated from "../middleware/auth";
// import { authorizedSupplier } from "../middleware/role";
// import * as shopify from "../controllers/shopify";
// //get
// router.route("/token").post(shopify.redirectToUrl);
// router.route("/token1").post(shopify.retrieveAccessToken);
// export default router;

import { Router } from "express";
const router: Router = Router();
import isAuthenticated from "../middleware/auth";
import { authorizedSupplier } from "../middleware/role";
import * as shopify from "../controllers/shopifyController";
//get
router.route("/importProducts").post(shopify.importProducts);
router.route("/getProducts").get(shopify.getShopifyProducts);

export default router;