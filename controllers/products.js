// const products = []
const Product = require('../models/product') // import class by adding a new constant, the convention is to use a capital staring character for classes

exports.getAddProduct = (req, res, next) => {
  console.log('Middleware 3')
  //   res.send(
  //     "<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  //   );
  //   res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  })
}

exports.postAddProduct = (req, res, next) => {
  console.log(req.body)
  // products.push({ title: req.body.title })
  const product = new Product(req.body.title) // create a new object based on this class blueprint and that is what classes are in the end, they are blueprints.
  product.save()
  res.redirect('/') // redirect to the root URL
}

exports.getProducts = (req, res, next) => {
  // const products = products
  // const products = Product.fetchAll()
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    })
  })

  // res.render('shop', {
  //   prods: products,
  //   pageTitle: 'Shop',
  //   path: '/',
  //   hasProducts: products.length > 0,
  //   activeShop: true,
  //   productCSS: true,
  // })
}
