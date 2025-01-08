const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

// Define the Demographic Type
const DemographicType = new GraphQLObjectType({
  name: 'Demographic',
  fields: () => ({
    id: { type: GraphQLInt },
    villageName: { type: GraphQLString },
    populationSize: { type: GraphQLString },
    ageDistribution: { type: GraphQLString },
    genderRatios: { type: GraphQLString },
    growthRate: { type: GraphQLString }
  })
});

module.exports = DemographicType;
