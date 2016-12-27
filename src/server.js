import express from 'express';
import path from 'path';
import compression from 'compression';
const app = express();
app.use(compression());


// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // hey we made it!
      const appHtml = renderToString(<RouterContext {...props}/>);
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
