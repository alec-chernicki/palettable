"use strict";

const Canvas = require("canvas");
const helpers = require("../utils/helpers");
const colorInterpreter = require("color");

exports.drawMetaImage = (req, res) => {
  const palette = req.params.palette;
  if (!palette || palette.indexOf("-") === -1) {
    res.status(404);
    return res.end("Error");
  }

  const formattedPalette = palette
    .split("-")
    .filter(color => helpers.isHex(color));
  if (formattedPalette.length <= 1) {
    res.status(404);
    return res.end("Error");
  }

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=31536000");
  res.setHeader("Expires", new Date(0));
  res.setHeader("Last-Modified", new Date(0));

  const canvas = new Canvas(950, 500);
  const ctx = canvas.getContext("2d");
  const stream = canvas.createPNGStream();

  stream.on("data", chunk => {
    res.write(chunk);
  });
  stream.on("end", () => {
    res.end();
  });

  for (let i = 0; i < formattedPalette.length; i++) {
    const currentXCoordinate = 950 / formattedPalette.length;
    ctx.fillStyle = `#${formattedPalette[i]}`;
    ctx.fillRect(i * currentXCoordinate, 0, currentXCoordinate, 500);
  }

  const luminosity = colorInterpreter(`#${formattedPalette[0]}`).luminosity();
  const titleColor = luminosity < 0.55 ? "#FFF" : "#444";

  ctx.font = "bold 22px Arial";
  ctx.fillStyle = titleColor;
  ctx.fillText("PALETTABLE", 24, 50);

  return 1;
};
