const { GraphQLList, GraphQLString } = require('graphql');
const { Demographic  } = require('../../models/demographic.js');
const DemographicType = require('../types/demographicType.js');

const demographicQueries = {
    demographics: {
    type: new GraphQLList(DemographicType),
    resolve(parent, args) {
      return Demographic.findAll(); // Fetch all villages
    }
  },
  demographic: {
    type: DemographicType,
    args: { villageName: { type: GraphQLString } },
    resolve(parent, args) {
      return Demographic.findOne({ where: { villageName: args.villageName } });
    }
  }
};

module.exports = demographicQueries;