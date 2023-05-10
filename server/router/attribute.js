// const { requireSignin, userMiddleware } = require("../common-middleware");
const { addAttribute,allattribute} = require("../controller/Attribute");
const express = require("express");
const router = express.Router();

router.post("/addAttribute", addAttribute);
router.get('/allAttribute', allattribute);
// router.get("/getOrders", requireSignin, userMiddleware, getOrders);
// router.post("/getOrder", requireSignin, userMiddleware, getOrder);

module.exports = router;