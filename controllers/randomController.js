'use strict'

const axios = require('axios')

const fetchRandomPalette = () => {
  return axios.get('/random')
    .then(response => {
      let colors = response.data[0].colors

      if (colors.length < 5) {
        // Continue calling API until palette that's 5 colors long (which is most of
        // them) returns. This is because the API doesn't allow you to search by
        // palette length and doesn't standardize this on their platform.
        return fetchRandomPalette()
      }
      else {
        return colors
      }
    })
}

exports.getRandom = function (req, res, next) {
  fetchRandomPalette()
    .then(colors => res.json(colors))
    .catch(() => {
      return next(new Error('Error fetching random palette'))
    })
}
