const path = require('path')

const express = require('express')

const rootDir = require('../util/path') // import the path to the root directory of the project

const router = express.Router() // Router is a class in Express that allows you to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-application".

const products = []

router.get('/add-product', (req, res, next) => {
  console.log('Middleware 3')
  //   res.send(
  //     "<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  //   );
  //   res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  })
})
router.post('/add-product', (req, res, next) => {
  console.log(req.body)
  products.push({ title: req.body.title })
  res.redirect('/') // redirect to the root URL
})
// module.exports = router // export the router instance so it can be used in other files

exports.routes = router
exports.products = products
