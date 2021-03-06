const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the post"
      })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

module.exports = router;
