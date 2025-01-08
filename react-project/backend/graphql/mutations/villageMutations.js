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
  },
  updateVillage: {
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
      return Village.update({
        image: args.image,
        region: args.region,
        landArea: args.landArea,
        latitude: args.latitude,
        longitude: args.longitude,
        category: args.category
      },{where:{ name: args.name,}});
    }
  },

  deleteVillage: {
    type: VillageType,
    args: {
      name: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Village.destroy({
        where: {
          name: args.name, 
        }
      });
    }
  }
};

module.exports = villageMutations;
