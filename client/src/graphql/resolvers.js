import gql from 'graphql-tag';
import url from '../utilities/url';

export const defaults = {
  dislikedColors: [],
  likedColors: url.parseColors() || [],
};

export const resolvers = {
  Mutation: {
    dislikeColor: (_, variables, { cache }) => {
      const query = gql`
        query {
          palette {
            colors
          }
          likedColors
          dislikedColors
        }
      `;
      const cachedData = cache.readQuery({ query });
      const newData = {
        palette: cachedData.palette,
        likedColors: cachedData.likedColors,
        dislikedColors: [...cachedData.dislikedColors, variables.color],
      };

      cache.writeQuery({ query, newData });

      return variables.color;
    },

    likeColor: (_, variables, { cache }) => {
      const query = gql`
        query {
          likedColors
        }
      `;
      const cachedData = cache.readQuery({ query });
      const newData = {
        likedColors: [...cachedData.likedColors, variables.color],
      };

      cache.writeQuery({ query, data: newData });

      return variables.color;
    },

    removeColor: (_, variables, { cache }) => {
      const query = gql`
        query {
          likedColors
        }
      `;
      const cachedData = cache.readQuery({ query });
      const newData = cachedData.likedColors.filter(likedColor => {
        return likedColor.id !== variables.color.id;
      });

      cache.writeQuery({ query, data: newData });

      return variables.color;
    },
  },
};
