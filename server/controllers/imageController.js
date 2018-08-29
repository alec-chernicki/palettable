// @flow
const path = require('path');
const Canvas = require('canvas');
const Color = require('color');

const isHex = color => {
  const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  const colorText = /#/.test(color) ? color : `#${color}`;

  return regex.test(colorText);
};

function getFontFile(name) {
  return path.resolve(__dirname, '../assets/', name);
}

Canvas.registerFont(getFontFile('Asap-Bold.ttf'), {
  family: 'Asap',
  weight: 'bold',
});

module.exports.drawImage = (req, res) => {
  const palette = req.params.palette.replace('.png', '');

  if (!palette === -1) {
    res.status(404);
    return res.end('Error');
  }

  const formattedPalette = palette.split('-').filter(color => isHex(color));

  if (formattedPalette.length === 0) {
    res.status(404);
    return res.end('Error');
  }

  res.setHeader('Expires', new Date(0));
  res.setHeader('Last-Modified', new Date(0));
  res.setHeader('Content-disposition', `attachment; filename=${palette}.png`);
  res.setHeader('Content-Type', 'image/png');

  const DPI_FACTOR = 2;
  const CANVAS_WIDTH = 900 * DPI_FACTOR;
  const CANVAS_HEIGHT = 550 * DPI_FACTOR;
  const IMAGE_WIDTH = 900;
  const IMAGE_HEIGHT = 550;
  const IMAGE_BAR_HEIGHT = IMAGE_HEIGHT / 10;
  const FONT_HEIGHT = 22;

  const canvas = Canvas.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  const ctx = canvas.getContext('2d');
  ctx.scale(DPI_FACTOR, DPI_FACTOR);
  ctx.font = `bold ${FONT_HEIGHT}px Asap`;

  canvas.createPNGStream().pipe(res);

  const _getInterfaceColor = hexCode => {
    const colorObject = Color(hexCode);
    const black = Color('#333');
    const white = Color('#FFF');

    const interfaceColor = colorObject.dark()
      ? colorObject.mix(white)
      : colorObject.mix(black);

    return interfaceColor.hex();
  };

  // Iterates over each color and draws a vertical rectangle
  for (let i = 0; i < formattedPalette.length; i++) {
    const colorWidth = IMAGE_WIDTH / formattedPalette.length;
    const hexCode = `#${formattedPalette[i]}`;

    // Draws color item
    ctx.fillStyle = hexCode;
    ctx.fillRect(i * colorWidth, 0, colorWidth, IMAGE_HEIGHT);

    // Draws hex code
    ctx.textAlign = 'center';
    ctx.fillStyle = _getInterfaceColor(hexCode);
    ctx.fillText(hexCode, i * colorWidth + colorWidth / 2, IMAGE_HEIGHT - 35);
  }

  // Draws top white bar
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_BAR_HEIGHT);

  // Draws title
  ctx.textAlign = 'left';
  ctx.fillStyle = '#333';
  ctx.fillText(
    'PALETTABLE',
    IMAGE_WIDTH / 50,
    IMAGE_BAR_HEIGHT / 2 + FONT_HEIGHT / 2 - 3
  );

  ctx.textAlign = 'end';
  ctx.font = `bold ${FONT_HEIGHT / 1.75}px Asap`;
  ctx.fillStyle = '#999';
  ctx.fillText(
    `palettable.io/${palette}`,
    IMAGE_WIDTH - IMAGE_WIDTH / 50,
    IMAGE_BAR_HEIGHT / 2 + FONT_HEIGHT / 2 - 7
  );

  return 1;
};
