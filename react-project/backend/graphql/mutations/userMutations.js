// userMutations.js
const { GraphQLString, GraphQLBoolean } = require('graphql');
const UserType = require('../types/userType');
const { User } = require('../../models/users.js');

const userMutations = {
  createUser: {
    type: UserType,
    args: {
      fullName: { type: GraphQLString },
      username: { type: GraphQLString },
      password: { type: GraphQLString },
      role: { type: GraphQLString },
      activeStatus: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      // Check if the username already exists
      return User.findOne({ where: { username: args.username } })
        .then(existingUser => {
          if (existingUser) {
            throw new Error('Username already exists');
          }

          return User.create({
            fullName: args.fullName,
            username: args.username,
            password: args.password,
            role: args.role || 'user', // Default to 'user' if not provided
            activeStatus: args.activeStatus !== undefined ? args.activeStatus : true,
          });
        })
        .then(user => {
          return {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            role: user.role,
            activeStatus: user.activeStatus
          };
        })
        .catch(error => {
          console.error('Error creating user:', error);
          throw new Error('Error creating user: ' + error.message);
        });
    }
  }
};

module.exports = userMutations;
