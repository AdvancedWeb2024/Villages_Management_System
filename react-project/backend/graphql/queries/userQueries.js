const { GraphQLInt, GraphQLList, GraphQLString } = require('graphql');
const UserType = require('../types/userType');
const { User } = require('../../models/users'); 
const userQueries = {
  // Get User by ID
  getUser: {
    type: UserType,
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(parent, args) {
      try {
        const user = await User.findByPk(args.id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
      }
    },
  },
  // Get All Users
  getUsers: {
    type: new GraphQLList(UserType),
    async resolve() {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
      }
    },
  },
  // Get Users by Role
  getUsersByRole: {
    type: new GraphQLList(UserType),
    args: {
      role: { type: GraphQLString },
    },
    async resolve(parent, args) {
      try {
        const users = await User.findAll({
          where: {
            role: args.role,
          },
        });
        if (users.length === 0) {
          throw new Error('No users found with the given role');
        }
        return users;
      } catch (error) {
        throw new Error('Error fetching users by role: ' + error.message);
      }
    },
  },
  // Authenticate User
  authenticateUser: {
    type: UserType,
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args) {
      try {
        
        const user = await User.findOne({ where: { username: args.username } });
        if (!user) {
          throw new Error('User not found');
        }
       
        if (user.password !== args.password) {
          throw new Error('Invalid credentials');
        }
        
        return user;
      } catch (error) {
        throw new Error('Error authenticating user: ' + error.message);
      }
    },
  },
};
module.exports = userQueries;