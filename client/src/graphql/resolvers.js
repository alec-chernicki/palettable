import gql from 'graphql-tag';
import url from '../utilities/url';

export const defaults = {
  dislikedColors: [],
  likedColors: url.parseColors() || [],
};

export const resolvers = {
  Mutation: {
    // dislikeColor: (_, variables, { cache }) => {
    //   const query = gql`
    //     query {
    //       palette {
    //         colors
    //       }
    //       likedColors
    //       dislikedColors
    //     }
    //   `;
    //   const cachedData = cache.readQuery({ query });
    //   const newData = {
    //     palette: cachedData.palette,
    //     likedColors: cachedData.likedColors,
    //     dislikedColors: [...cachedData.dislikedColors, variables.color],
    //   };

    //   cache.writeQuery({ query, newData });

    //   return variables.color;
    // },

    hydrateInitialLikedColors: (_, variables, { cache }) => {
      const colorsFromUrl = url.parseColors();

      if (colorsFromUrl.length) {
        cache.writeQuery({
          query: gql`
            query {
              likedColors
            }
          `,
          data: { likedColors: colorsFromUrl },
        });

        return colorsFromUrl;
      }

      const cachedData = cache.readQuery({
        query: gql`
          query {
            palette {
              colors
            }
          }
        `,
      });

      cache.writeQuery({
        query: gql`
          query {
            likedColors
          }
        `,
        data: { likedColors: [cachedData.palette.colors[0]] },
      });

      return [cachedData.palette.colors[0]];
    },

    likeColor: (_, variables, { cache }) => {
      const readQuery = gql`
        query {
          palette {
            colors {
              id
              hexCode
            }
          }
          likedColors {
            id
            hexCode
          }
        }
      `;

      const writeQuery = gql`
        query {
          likedColors {
            id
            hexCode
          }
        }
      `;

      const cachedData = cache.readQuery({ query: readQuery });
      const likedColor = cachedData.palette.colors.filter(likedColor => {
        return likedColor.id === variables.id;
      });
      const newData = {
        likedColors: likedColor,
      };

      cache.writeQuery({ query: writeQuery, data: newData });
      return likedColor;
    },

    //   removeColor: (_, variables, { cache }) => {
    //     const query = gql`
    //       query {
    //         likedColors
    //       }
    //     `;
    //     const cachedData = cache.readQuery({ query });
    //     const newData = cachedData.likedColors.filter(likedColor => {
    //       return likedColor.id !== variables.color.id;
    //     });

    //     cache.writeQuery({ query, data: newData });

    //     return variables.color;
    //   },
  },
};
