const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PollItem = require('../models/PollItem.js');


const Pusher = require('pusher');
const pusher = new Pusher({
  appId: '682869',
  key: '5110e29e563becf91c35',
  secret: '0df912835a5d3c0277a0',
  cluster: 'eu',
  encrypted: true
});

router.get("/", (req, res) => {
  PollItem.find()
    .then(PollItems => res.json({
      succes: true,
      PollItems: PollItems
    }));

});

router.route('/:id')
  .delete((req, res) => {
    console.log(req.params.id);
    PollItem.findById(req.params.id, (err, task) => {
      console.log(task);
      if (err) {
        console.log('DELETE Error: ' + err);
        res.status(500).send('Error');
      } else if (task) {
        task.remove(() => {
          res.status(200).json(task);
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  });

router.post("/", (req, res) => {
  const newPollItem = {
    pos: req.body.pos,
    points: 1,

  }

  new PollItem(newPollItem).save()
    .then(PollItem => {
      pusher.trigger('my-poll', 'my-PollItem', {
        "pos": PollItem.pos
      });

      return res.json({
        succes: true,
        message: "it is done"
      })


    });
});




module.exports = router;