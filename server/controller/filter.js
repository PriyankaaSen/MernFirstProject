const Product = require('../model/productSchema');

exports.searchProductByQuery = async (req, res) => {
    const { type, query } = req.body;

    try {
        let products;

        switch (type) {
            case 'text':
                products = await Product.find({ $text: { $search: query } })
                break;
        }
        if (!products.length > 0){
            products = await Product.find({})
        }
        res.json({products})
    } catch (err) {
        console.log(err, 'filter Controller.searchProductByQuery error');

    }
}