const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');

// Define the Village Type
const VillageType = new GraphQLObjectType({
  name: 'Village',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    region: { type: GraphQLString },
    landArea: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    category: { type: GraphQLString }
  })
});

module.exports = VillageType;
