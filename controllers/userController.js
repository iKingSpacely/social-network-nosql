const { User, Thoughts } = require('../models');

module.exports = {
  
  //get all users
  async getUsers(req, res) {
    try {
      const thoughts = await User.find();
      if (!thoughts) {
        return res.status(404).json({ message: 'There is no thought with that ID!' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get single user
  async getSingleUser(req, res) {
    try {
      const thought = await User.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'There is no thought with that ID!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const thought = await User.create(req.body);
      if (!thought) {
        return res.status(404).json({ message: 'There is no thought with that ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  //update single user
  async updateUser(req, res) {
    try {
      const thought = await User.findOneAndUpdate({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Cant update because there is no thought with that ID!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete single user
  async deleteUser(req, res) {
    try {
      const thought = await User.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Cant delete becaues there is no thought with that ID!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};