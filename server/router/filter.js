const router = require("express").Router();
const {searchProductByQuery} = require('../controller/filter');

router.post("/search", searchProductByQuery)

// router.post("/search", filterController.searchProductByQuery)
// router.get("/search/:key", async (req,res) => {
//     const result = await Product.find({
//         "$or": [
//             {
//                 name:{$regex:req.params.key}
//             },
//             {
//                 slug:{$regex:req.params.key}
//             }
//         ]
//     })
//     res.send(result)
// })
module.exports = router;