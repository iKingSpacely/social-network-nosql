const { User, Thoughts } = require('../models');

module.exports = {
  
  //get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).json({ message: 'Oh no! Cant find users!' });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'There is no user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      if (!user) {
        return res.status(404).json({ message: 'Cannot create user!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  //update single user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true });

      if (!user) {
        return res.status(404).json({ message: 'Cant update because there is no user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete single user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      const thoughts = await Thoughts.deleteMany({ _id: {$in: user.thoughts }})

      if (!user) {
        return res.status(404).json({ message: 'Cant delete becaues there is no user with that ID!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    //add a friend
    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId }, 
          { $addToSet: { friends: req.params.friendId }}, 
          { new: true });

        if (!user) {
          return res.status(404).json({ message: 'Cant add friend!' });
        }
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

      //delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $pull: { friends: req.params.friendId }}, 
        { new: true });

      if (!user) {
        return res.status(404).json({ message: 'Cant delete becaues there is no friend with that ID!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};