const { GraphQLString } = require('graphql');
const DemographicType = require('../types/demographicType');
const { Demographic } = require('../../models/demographic.js');

const demographicMutations = {
  addDemographic: {
    type: DemographicType,
    args: {
      villageName: { type: GraphQLString },
      populationSize: { type: GraphQLString },
      ageDistribution: { type: GraphQLString },
      genderRatios: { type: GraphQLString },
      growthRate: { type: GraphQLString }
    },
    resolve(parent, args) {
      return Demographic.create({
        villageName: args.villageName,
        populationSize: args.populationSize,
        ageDistribution: args.ageDistribution,
        genderRatios: args.genderRatios,
        growthRate: args.growthRate
      });
    }
  }
};

module.exports = demographicMutations;
