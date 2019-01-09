const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote.js');



const Pusher = require('pusher');
const pusher = new Pusher({
  appId: '682869',
  key: '5110e29e563becf91c35',
  secret: '0df912835a5d3c0277a0',
  cluster: 'eu',
  encrypted: true
});

router.get("/", (reg, res) => {
  Vote.find()
    .then(votes => res.json({
      succes: true,
      votes: votes
    }));

});

router.post("/", (req, res) => {
  const newVote = {
    pos: req.body.pos,
    points: 1,

  }


  new Vote(newVote).save()
    .then(vote => {
      pusher.trigger('my-poll', 'my-vote', {
        "points": parseInt(vote.points),
        "pos": vote.pos
      });

      return res.json({
        succes: true,
        message: "it is done"
      })


    });
});

router.delete((req, res) => {
  Task.findById("1", (err, task) => {
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



module.exports = router;