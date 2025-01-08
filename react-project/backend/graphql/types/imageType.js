const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

// Define the Image Type
const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

module.exports = ImageType;
