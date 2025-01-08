const { GraphQLList, GraphQLInt } = require('graphql');
const { Image } = require('../../models/images.js');
const ImageType = require('../types/imageType.js');

const imageQueries = {
  images: {
    type: new GraphQLList(ImageType),
    resolve(parent, args) {
      return Image.findAll(); // Fetch all villages
    }
  },
  image: {
    type: ImageType,
    args: { id: { type: GraphQLInt } },
    resolve(parent, args) {
        return Image.findByPk(args.id);;
    }
  }
};

module.exports = imageQueries;