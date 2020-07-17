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
    .catch(err => {
      res.status(500).json({ errormessage: "unable to validate user", err })
    })
  // do your magic!

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!

  // const postId = { user_id: req.params.id }
  // const postUpdate = { text: req.body.text }

  const postUpdate = {
    ...req.body, user_id: req.params.id
  }
  Posts.insert(postUpdate)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ errormessage: "unable to validate post", err })
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

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ errormessage: "user could not be retrieved", err })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: "error getting post", err })
    })

});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(user => {
      if (user > 0) {
        res.status(200).json({ message: "delete successful" })
      } else {
        res.status(404).json({ message: "this user id does not exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ errormessage: "the user could not be removed", err })
    })
});

router.put('/:id', (req, res) => {
  const change = req.body
  Users.update(req.params.id, change)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errormessage: "could not update user" })
    })

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
    .catch(err => {
      console.log(err)
      res.status(500).json({ errmessage: "could not validate id" })
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
