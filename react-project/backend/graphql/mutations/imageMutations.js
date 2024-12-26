const { GraphQLString } = require('graphql');
const ImageType = require('../types/imageType');
const { Image } = require('../../models/images.js');

const imageMutations = {
  addImage: {
    type: ImageType,
    args: {
      name: { type: GraphQLString },
      image: { type: GraphQLString },
      description: { type: GraphQLString }
    },
    resolve(parent, args) {
      return Image.create({
        name: args.name,
        image: args.image,
        description: args.description
      });
    }
  }
};

module.exports = imageMutations;
