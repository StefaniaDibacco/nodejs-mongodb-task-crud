import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import indexRoutes from './routes/index.routes';
import morgan from 'morgan';
const app = express();

app.set('views', path.join(__dirname, 'views'));

app.engine(
  '.hbs',
  create({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaulLayout: 'main',
    extname: '.hbs',
  }).engine
);
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//routes
app.use(indexRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.status(404).render('404');
});

export default app;
