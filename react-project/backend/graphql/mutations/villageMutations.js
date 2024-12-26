const { GraphQLString, GraphQLFloat } = require('graphql');
const VillageType = require('../types/villageType');
const { Village } = require('../../models/villages.js');

const villageMutations = {
  addVillage: {
    type: VillageType,
    args: {
      name: { type: GraphQLString },
      image: { type: GraphQLString },
      region: { type: GraphQLString },
      landArea: { type: GraphQLFloat },
      latitude: { type: GraphQLFloat },
      longitude: { type: GraphQLFloat },
      category: { type: GraphQLString }
    },
    resolve(parent, args) {
      return Village.create({
        name: args.name,
        image: args.image,
        region: args.region,
        landArea: args.landArea,
        latitude: args.latitude,
        longitude: args.longitude,
        category: args.category
      });
    }
  }
};

module.exports = villageMutations;
