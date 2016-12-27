import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import mongoose from  'mongoose';
import BearModel from './models/bear';

mongoose.connect('mongodb://127.0.0.1/simpleImageServer');


const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3020;

var router = express.Router();
router.use((req, res, next) =>{
  console.log('Something is happening');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);

router.route('/bears')
  .post((req,res)=>{
    const bearModel = new BearModel();
    bearModel.name = req.body.name;

    bearModel.save(err=>{
      if(err){
        res.send(err);
      }
      res.json({message : 'Bear Created !'});
    });
  })
  .get((req,res)=>{
    BearModel.find((err,bears)=>{
      if(err){
        res.send(err);
      }

      res.json(bears);
    });
  });

router.route('/bears/:bear_id')
  .get((req,res)=>{
    BearModel.findById(req.params.bear_id, (err,bear)=>{
      if(err){
        res.send(err);
      }
      res.json(bear);
    });
  })
  .put((req,res)=>{
    BearModel.findById(req.params.bear_id, (err,bear)=>{
      if(err){
        res.send(err);
      }
      bear.name = req.body.name;
      bear.save(err => {
        if(err){
          res.send(err);
        }
        res.json({message : 'Bear Updated !'});
      });
    });
  })
  .delete((req,res)=>{
    BearModel.remove({
      _id : req.params.bear_id
    },(err,bear)=>{
      if(err){
        res.send(err);
      }

      res.json({message : 'Successfully deleted !'});
    });
  });


app.listen(PORT, ()=> {
  console.log('Magic start on port ' + PORT);
});
