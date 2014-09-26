(function(global, undefined) {

  'use strict';

  var tileset = document.getElementById('tilesets'),
      ctxTileset = tileset.getContext('2d'),
      tilesetContainer = document.getElementById('tilesets-container'),
      sprite = document.getElementById('tileset-base-1'),
      tileSize = 32;

  var tilesetTemplate = [];

  //47 tiles template
  tilesetTemplate[47] = {
    map: [1, 2, 3, 2, 3, 4, 1, 4, 1, 2, 3, 2, 3, 4, 8, 9, 8, 9, 8, 9, 7, 14, 14, 8, 8, 10, 7, 10, 7, 5, 6, 5, 6, 10, 14, 5, 6, 5, 6, 15, 13, 14, 14, 8, 8, 16, 13, 16, 13, 11, 12, 11, 12, 16, 8, 11, 12, 11, 12, 9, 7, 8, 8, 8, 14, 10, 7, 10, 7, 5, 6, 5, 6, 10, 14, 5, 6, 5, 6, 9, 13, 8, 8, 8, 14, 16, 13, 16, 13, 11, 12, 11, 12, 16, 14, 11, 12, 11, 12, 9, 19, 20, 21, 20, 21, 22, 19, 22, 19, 20, 21, 20, 21, 22, 14, 15, 15, 15, 15, 15, 1, 2, 3, 2, 3, 4, 1, 4, 2, 3, 9, 10, 7, 9, 2, 3, 8, 11, 12, 8, 19, 20, 21, 20, 21, 22, 19, 22, 9, 5, 6, 16, 13, 5, 6, 9, 6, 5, 6, 5, 0, 0, 0, 0, 9, 11, 12, 9, 7, 11, 12, 9, 9, 11, 12, 10, 12, 11, 12, 11, 0, 0, 0, 0, 6, 9, 9, 5, 13, 9, 20, 21, 20, 21, 9, 16, 8, 5, 6, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    width: 10,
    height: 5
  };

  //rezise the canvas tileset and and it's container div
  function tilesetSize(width, height){

    tileset.width = width;
    tileset.height = height;

    tilesetContainer.style.width = width+'px';
    tilesetContainer.style.height = height+'px';

  }

  //draw each peace of the tiles
  function drawTile(x, y, type){

    var spriteY = type / 6 >> 0;
    var spriteX = (type - spriteY * 6);

    ctxTileset.drawImage(
      sprite,
      spriteX * (tileSize / 2),
      spriteY * (tileSize / 2),
      (tileSize / 2),
      (tileSize / 2),
      (x * (tileSize / 2)),
      (y * (tileSize / 2)),
      (tileSize / 2),
      (tileSize / 2)
    );

  }



  function generate(){
    var h = 0, w = 0;

    tilesetSize(
      tilesetTemplate[47].width * tileSize,
      tilesetTemplate[47].height * tileSize
    );

    for (; h < tilesetTemplate[47].height * 2; h++) {
      for (w = 0; w < tilesetTemplate[47].width * 2; w++) {

        drawTile(w, h, tilesetTemplate[47].map[(tilesetTemplate[47].width * 2) * h + w] - 1);

      }
    }

  }

  generate();

}(window));