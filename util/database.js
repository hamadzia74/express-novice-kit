// setup the code that will allow us to connect to the SQL database and then also give us back a connection object so to say which allows us to run queries.
const mysql = require('mysql2');

// Now there are two ways of connecting with a SQL database. One is that we setup one connection which we can then use to run queries and we should always close the connection once we are done with a query. The downside is that we need to re-execute the code to create the conntection for every new query and there will be a lot of queries because we fetch data, we write data, we delete data, creating new connections all the time quickly becomes very inefficient both in our code and also regarding the connection to the database which is established and the performance this may cost. So a better way is to create a so-called connection pool which allows us to reuse connections and is generally more efficient.

// a pool of connections which will allow us to always reach out to it whenever we have a query to run and then we get a new connection from that pool which manages multiple connections so that we can run multiple queries simultaneously becuase each query needs its own connection and once the query is done, the connection will be handed back into the pool and it's available again for a new query and the pool can then be finished when our application shuts down.

// Pass in a javascript object with some information about our database engine, our database host we're connecting to. 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_complete',
  password: 'password'
});

module.exports = pool.promise(); // this will allow us to use promises when working with these connections which of course handle asynchronous tasks, asynchronous data instead of callbacks because promises allow us to write code in a bit more structured way, we don't have many nested callbacks, instead we can use promise chains.
