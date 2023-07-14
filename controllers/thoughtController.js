const { User, Thoughts } = require('../models');

module.exports = {

  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      if (!thoughts) {
        return res.status(404).json({ message: 'Oh no! Cant get thoughts!' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtId }).select('-__v');;

      if (!thought) {
        return res.status(404).json({ message: 'There is no thought with that ID!' });
      } 
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a thought
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const data = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id}});
      //don't need to call data according to instructors' help in office hours today
      if (!thought) {
        return res.status(404).json({ message: 'Cant create your thought because there is no user with that ID!' });
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