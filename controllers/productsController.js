// Imports 
// import schemes 
const Categories = require("../models/category");
const Products = require("../models/product");

// import async handler
const asyncHandler = require("express-async-handler");

// CATEGORIES INDEX CONTROLLER //

exports.index = asyncHandler(async (req, res, next) => {
    const productCount = await Products.countDocuments({}).exec();
    const allProductsArr = await Products.find({}).exec();

    res.render("productsIndex", { 
        pagetitle : "Products",
        productCount : productCount,
        allProductsArr : allProductsArr,
    })
});