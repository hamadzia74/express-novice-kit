// Node Specific module
// const http = require("http");
const path = require('path')

// Third Party Packages
const express = require('express')

const adminData = require('./routes/admin') // import the admin routes
const shopRoutes = require('./routes/shop')

const bodyParser = require('body-parser') // middleware to parse incoming request bodies
// const expressHbs = require('express-handlebars')

const app = express() // app here actually also happens to be a valid request handler so you can pass it directly to createServer

// we are telling express that we want to compile dynamic templates with the pug engine and where to find these templates.
// app.set('view engine', 'pug')
// app.set('views', 'views')

// register a new templating engine
// app.engine(
//   'handlebars',
//   expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'handlebars',
//   })
// ) // this function returns the initialised view engine which we can assign to engine here
// app.set('view engine', 'handlebars')
// app.set('views', 'views')


app.set('view engine', 'ejs') // set the view engine to ejs
app.set('views', 'views') // set the views directory where the templates are located
// app.set('views', path.join(__dirname, 'views')) // set the views directory to the views folder in the current directory


// app.use((req, res, next) => {
//   console.log("Middleware 1");
//   next(); // calls the next middleware function in the stack
// }); // use allows us to register middleware functions that will be executed for every request (incoming request) to the server (allows us to add a new middleware function to the stack)

// app.use((req, res, next) => {
//   console.log("Middleware 2");
//   res.send("<h1>Hello from Express!</h1>"); // a new utility function - sends a response to the client and ends the request-response cycle. The send function can take a string, an object, or a buffer as an argument. If you pass an object, Express will automatically convert it to JSON and set the appropriate headers. If you pass a string, Express will set the content type to text/html by default. If you pass a buffer, Express will set the content type to application/octet-stream by default.
//   // res.send() can be called only once per request. If you call it multiple times, you'll get an error.
// });

// app.use("/", (req, res, next) => {
//   console.log("This always runs!");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public'))) // serve static files from the public directory

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  // this will be executed for any request that doesn't match the above routes
  // res.status(404).send("<h1>Page Not Found</h1>");
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html')) // send a 404 error page to the client
  res.status(404).render('404', { pageTitle: 'Page Not Found' })
}) // set the status code to 404 and send a response to the client

// app.use((req, res, next) => {
// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000)
