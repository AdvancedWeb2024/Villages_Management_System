const { GraphQLString } = require('graphql');
const DemographicType = require('../types/demographicType');
const { Demographic } = require('../../models/demographic.js');

const demographicMutations = {
  upsertDemographic: {
    type: DemographicType,
    args: {
      villageName: { type: GraphQLString },
      populationSize: { type: GraphQLString },
      ageDistribution: { type: GraphQLString },
      genderRatios: { type: GraphQLString },
      growthRate: { type: GraphQLString },
    },
    async resolve(parent, args) {
      try {
        const [demographic, created] = await Demographic.upsert({
          villageName: args.villageName,
          populationSize: args.populationSize,
          ageDistribution: args.ageDistribution,
          genderRatios: args.genderRatios,
          growthRate: args.growthRate,
        });

        if (created) {
          console.log('New demographic record created');
        } else {
          console.log('Existing demographic record updated');
        }
        return demographic;
      } catch (error) {
        throw new Error('Error upserting demographic data: ' + error.message);
      }
    },
  },
};

module.exports = demographicMutations;
