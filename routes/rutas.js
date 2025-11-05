// El único cambio está en la línea de productsRouter
const productsRouter = require('./productsRouter'); // Correcto
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const brandsRouter = require('./brandsRouter');

function routerApi(app){
  app.use('/products', productsRouter);
  app.use('/movies', require('./moviesRouter'));
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);
  app.use('/brands', brandsRouter);
}

module.exports = routerApi;