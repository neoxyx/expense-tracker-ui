const express = require('express');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/expense-tracker-ui/server/main');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const path = require('path');
const { ngExpressEngine } = require('@nguniversal/express-engine');

const app = express();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [provideModuleMap(LAZY_MODULE_MAP)],
}));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'dist/expense-tracker-ui/browser'));

app.get('*.*', express.static(path.join(__dirname, 'dist/expense-tracker-ui/browser')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
