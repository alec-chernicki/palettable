import gql from 'graphql-tag';
import url from '../utilities/url';
import { pluck } from 'underscore';

export const defaults = {
  dislikedColors: [],
  likedColors: [],
};

const _setPaletteUrl = likedColors => {
  const newUrl = url.stringifyColors(likedColors);
  window.history.replaceState({}, 'palettable', newUrl);
};

export const resolvers = {
  Mutation: {
    changeColor: (_, variables, { cache }) => {
      const cachedData = cache.readQuery({
        query: gql`
          query {
            likedColors {
              id
              hexCode
            }
          }
        `,
      });
      const likedColorsWithChangedColor = cachedData.likedColors.map(
        likedColor => {
          if (likedColor.id === variables.id) {
            const newLikedColor = {
              ...likedColor,
              hexCode: variables.hexCode,
            };

            return newLikedColor;
          }

          return likedColor;
        }
      );

      cache.writeQuery({
        query: gql`
          query {
            likedColors {
              id
              hexCode
            }
          }
        `,
        data: { likedColors: likedColorsWithChangedColor },
      });

      _setPaletteUrl(likedColorsWithChangedColor);
      return likedColorsWithChangedColor;
    },
    dislikeColor: (_, variables, { cache }) => {
      const { palette, likedColors, dislikedColors } = cache.readQuery({
        query: gql`
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
            dislikedColors
          }
        `,
      });
      const dislikedColor = likedColors.filter(color => {
        return color.id === variables.id;
      })[0];
      const newColorToShow = palette.colors.filter(color => {
        return (
          pluck(dislikedColors, 'id').indexOf(color.id) === -1 &&
          pluck(likedColors, 'id').indexOf(color.id) === -1
        );
      })[0];
      const likedColorsWithChangedColor = likedColors.map(color => {
        if (color.id === variables.id) {
          return newColorToShow;
        }

        return color;
      });
      const newData = {
        likedColors: likedColorsWithChangedColor,
        dislikedColors: [...dislikedColors, dislikedColor],
      };

      cache.writeQuery({
        query: gql`
          query {
            likedColors {
              id
              hexCode
            }
            dislikedColors
          }
        `,
        data: newData,
      });

      _setPaletteUrl(likedColorsWithChangedColor);
      return likedColorsWithChangedColor;
    },

    hydrateInitialLikedColors: (_, variables, { cache }) => {
      const colorsFromUrl = url.parseColors();

      if (colorsFromUrl.length) {
        cache.writeQuery({
          query: gql`
            query {
              likedColors {
                id
                hexCode
              }
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
              colors {
                id
                hexCode
              }
            }
          }
        `,
      });

      const firstColorFromFetchedPalette = cachedData.palette.colors[0];
      cache.writeQuery({
        query: gql`
          query {
            likedColors {
              id
              hexCode
            }
          }
        `,
        data: { likedColors: [firstColorFromFetchedPalette] },
      });

      _setPaletteUrl([firstColorFromFetchedPalette]);
      return [firstColorFromFetchedPalette];
    },

    likeColor: (_, variables, { cache }) => {
      const { palette, likedColors, dislikedColors } = cache.readQuery({
        query: gql`
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
            dislikedColors {
              id
            }
          }
        `,
      });

      if (likedColors.length === 5) {
        return likedColors;
      }

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

      _setPaletteUrl([...likedColors, newColorToShow]);
      return newColorToShow;
    },

    removeColor: (_, variables, { cache }) => {
      const cachedData = cache.readQuery({
        query: gql`
          query {
            likedColors {
              id
              hexCode
            }
          }
        `,
      });
      const colorswWithoutDislikedColor = cachedData.likedColors.filter(
        likedColor => {
          return likedColor.id !== variables.id;
        }
      );
      cache.writeQuery({
        query: gql`
          query {
            likedColors {
              id
            }
          }
        `,
        data: { likedColors: colorswWithoutDislikedColor },
      });

      _setPaletteUrl(colorswWithoutDislikedColor);
      return colorswWithoutDislikedColor;
    },
  },
};
