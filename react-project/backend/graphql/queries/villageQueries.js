const { GraphQLList, GraphQLString } = require('graphql');
const { Village } = require('../../models/villages.js');
const VillageType = require('../types/villageType');

const villageQueries = {
  villages: {
    type: new GraphQLList(VillageType),
    resolve(parent, args) {
      return Village.findAll(); // Fetch all villages
    }
  },
  village: {
    type: VillageType,
    args: { name: { type: GraphQLString } },
    resolve(parent, args) {
      return Village.findOne({ where: { name: args.name } });
    }
  }
};

module.exports = villageQueries;
