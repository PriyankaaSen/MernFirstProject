const express = require("express");
const router = express.Router();
const Product = require('../model/productSchema');
const shortid = require ('shortid')
const slugify = require('slugify')
const category = require('../model/category')

exports.createProduct = (req, res) => {
  // res.status(200).json({file:req.files, body: req.body});

const { name, price, description, category, quantity, size, color, createdBy } = req.body;

let productPictures = []

if(req.files.length > 0){
    productPictures = req.files.map(file => {
    return {img:file.filename}
  })
}

  const product = new Product({
     name:name,
     slug: slugify(name),
     price,
     quantity,
     description,
     size,
     color,
     productPictures,
     category,
     createdBy:req.user._id
  });

  product.save(((error, product) => {
    if(error) return res.status(400).json({error});
    if(product){
      res.status(200).json({product});
    }

  }));
}

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug }).select("_id type")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }

      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }
          // console.log('products111',products);

            if (products.length > 0) {
              res.status(200).json({
                products,
                productsByPrice: {
                  under5k: products.filter(product => product.price <= 5000),
                  under10k: products.filter(
                    product => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    product => product.price > 10000 && product.price <= 15000
                  ),

                },
              });
            }
           else {
            res.status(200).json({ products });
          }
        });
      }
    });
};

// exports.getProduct = async (req, res) =>{
//   const findAllCat= await Category.find({});
//   const findAllProduct= await Product.find({}).select('_id name category slug price quantity description productPictures').populate('category');
//   if (findAllProduct && findAllProduct) {
//     res.status(201).send({message:" Get all Product successfully...",
//     findAllCat : createCategories(findAllCat),
//     findAllProduct
//   });
//   }else{
//     res.status(400).send({message:"No Product in database...",err});
//   }
// }


exports.allproducts = async (req, res) => {
  const findAllProduct= await Product.find({});
  console.log(findAllProduct);
  if (findAllProduct) {
    res.status(201).send({message:" Get all Product successfully...",findAllProduct});
  }else{
    res.status(400).send({error:"No Product in database...",error});
  }
}


// exports.deleteProductById = (req, res) => {
//   const { productId } = req.body;
//   if (productId) {
//     Product.deleteOne({ _id: productId }).exec((error, result) => {
//       if (error) return res.status(400).json({ error });
//       if (result) {
//         res.status(202).json({ result });
//       }
//     });
//   } else {
//     res.status(400).json({ error: "Params required" });
//   }
// };
// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(200).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};
// get individual products

exports.getProductDetailsById = (req, res) => {
  const {id } = req.params
  if (id) {
    Product.findOne({ _id: id }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};



