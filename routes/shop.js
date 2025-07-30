const path = require('path')

const express = require('express')

const rootDir = require('../util/path')
const adminData = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log(adminData.products)
  console.log('Middleware 4')
  //   res.sendFile(path.join(__dirname, "..", "views", "shop.html")); // __dirname is a global variable in Node.js that contains the absolute path to the directory that contains the current executing script. It is a string that represents the path to the directory where the current module is located. In this case, it will be the path to the routes directory.

  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  const products = adminData.products
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    // layout: false,
  })
})

module.exports = router
