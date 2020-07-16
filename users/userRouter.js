const express = require('express');
const Users = require("./userDb");
const router = express.Router();
const Posts = require("../posts/postDb");

router.post('/', validateUser, (req, res) => {
  const newUser = {
    name: req.body.name
  }
  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
  // do your magic!

});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  Posts.insert(id)
    .then(post => {
      res.status(200).json(post)
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errormessage: "This didn't work" })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  Users.getById(id)
    .then(res => {
      if (res) {
        next()
      } else {
        res.status(400).json({ message: "Invalid User Id" })
      }
    })
}
// do your mag

function validateUser(req, res, next) {
  if (req.body.name) {
    next()
  } else {
    res.status(400).json({ message: "Missing name field " })
  }
  // do your magic!
}

function validatePost(req, res, next) {
  if (req.body.text) {
    next()
  } else {
    res.status(400).json({ message: "Missing required Text field" })

  }
  // do your magic!
}

module.exports = router;
