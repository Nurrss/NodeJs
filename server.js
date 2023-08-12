const express = require('express');
const chalk = require('chalk')
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postApiRoutes = require('./routes/api-post-routes')
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
require('dotenv').config()

const errroMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').white


const app = express();

app.set('view engine', 'ejs');



mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log(successMsg('Connected to DB')))
  .catch((error) => console.log(errroMsg(error)));

app.listen(process.env.PORT, (error) => {
  error ? console.log(errroMsg(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
