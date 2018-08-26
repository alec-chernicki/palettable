import gql from 'graphql-tag';
import url from '../utilities/url';
import { pluck } from 'underscore';

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

      const firstColorFromFetchedPalette = cachedData.palette.colors[0];
      cache.writeQuery({
        query: gql`
          query {
            likedColors
          }
        `,
        data: { likedColors: [firstColorFromFetchedPalette] },
      });

      return [firstColorFromFetchedPalette];
    },

    likeColor: (_, variables, { cache }) => {
      const { palette, likedColors, dislikedColors } = cache.readQuery({
        query: gql`
          query {
            palette {
              colors {
                id
              }
            }
            likedColors {
              id
            }
            dislikedColors {
              id
            }
          }
        `,
      });

      const newColorToShow = palette.colors.filter(color => {
        return (
          pluck(dislikedColors, 'id').indexOf(color.id) === -1 &&
          pluck(likedColors, 'id').indexOf(color.id) === -1
        );
      })[0];
      const newData = {
        likedColors: [...likedColors, newColorToShow],
      };

      cache.writeQuery({
        query: gql`
          query {
            likedColors {
              id
            }
          }
        `,
        data: newData,
      });
      return newColorToShow;
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
