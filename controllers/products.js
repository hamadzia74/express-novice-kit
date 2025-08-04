const products = []

exports.getAddProduct = (req, res, next) => {
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
}

exports.postAddProduct = (req, res, next) => {
  console.log(req.body)
  products.push({ title: req.body.title })
  res.redirect('/') // redirect to the root URL
}

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  })
}
