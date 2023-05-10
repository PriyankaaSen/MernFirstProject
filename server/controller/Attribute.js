const express = require("express");
const router = express.Router();
const Attribute = require('../model/addattributeSchema');
const shortid = require ('shortid')
const slugify = require('slugify')

exports.addAttribute = (req, res) => {
  const { attributeName, attributeTerms} = req.body;
  Attribute.findOne({attributeName:attributeName}).then((exist)=>{
    if (exist) {
            Attribute.updateOne(
              {attributeName:attributeName},
              {
                "$push" : {
                  attributeTerms:attributeTerms
                }
              },
              {new:true}
            ).then((resu)=>{
              res.status(200).send({message:"data add successfully...."})
            })
          } else {
          const attributeTaxonomy = new Attribute({
            attributeName,
            slug: slugify(attributeName),
            attributeTerms,
          });
          attributeTaxonomy.save().then(() => {
            res.status(200).send({ message: "Attribute created successfully..." });
          }).catch((error) => res.status(400).send({ error: "Please enter unique name", error }));
          }
        }).catch((error) => 
          res.status(400).send({ error: "No data found" })
        );
    
  }


  // const addAttribute = new Attribute({
    //     attributeName:attributeName,
    //     // slug,
    //     slug: slugify(attributeName),
    //     attributeTerms
    // });
  
    // addAttribute.save(((error, attribute) => {
    //   if(error) return res.status(400).json({error});
    //   if(attribute){
    //     res.status(200).send({message:" Attribute Added Successfully...",attribute});;
    //   }
  
    // }));

    exports.allattribute = async (req, res) => {
      const findAllAttribute= await Attribute.find({});
      console.log(findAllAttribute);
      if (findAllAttribute) {
        res.status(200).send({message:" Get all Attribute successfully...",findAllAttribute});
      }else{
        res.status(400).send({error:"No Attribute in database...",error});
      }
    }
    