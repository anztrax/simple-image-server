import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3020;
var router = express.Router();
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);

app.listen(PORT, ()=> {
  console.log('Magic start on port ' + PORT);
});
