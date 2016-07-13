const helpers = require('../utils/helpers');

exports.getHome = (req, res) => {
  const paletteParams = req.params.palette;
  const DEFAULT_PALETTE = '598987-678F8D-77A88D-FFD000-FF6670';

  // TODO: This can be cleaned up a bit
  if (paletteParams) {
    const hasDash = paletteParams.indexOf('-') !== -1;
    const isCorrectFormat = paletteParams.split('-').filter((color) => helpers.isHex(color)).length > 1;

    if (hasDash && isCorrectFormat) {
      res.render('index', {
        palette: paletteParams,
      });
    }
    else {
      res.render('index', {
        palette: DEFAULT_PALETTE,
      });
    }
  }
  else {
    res.render('index', {
      palette: DEFAULT_PALETTE,
    });
  }
};
