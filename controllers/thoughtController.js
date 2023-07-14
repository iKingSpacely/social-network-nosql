const { User, Thoughts } = require('../models');

module.exports = {
  
  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      if (!thoughts) {
        return res.status(404).json({ message: 'There is no thought with that ID!' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'There is no thought with that ID!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create new thought
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      if (!thought) {
        return res.status(404).json({ message: 'There is no thought with that ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update single thought
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Cant update because there is no thought with that ID!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  //delete single thought
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Cant delete becaues there is no thought with that ID!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};