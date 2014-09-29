(function(global, undefined) {

  'use strict';

  var $tileset = document.getElementById('tilesets'),
      ctxTileset = $tileset.getContext('2d'),
      $tilesetContainer = document.getElementById('tilesets-container'),
      $tilesetBase = document.getElementById('tileset-base-1'),
      $baseInput = $('#base-add'),
      $typeForm = $('#type'),
      $formTilesize = $('#form-tilesize'),
      $addTileset = document.getElementById('new-tileset-base'),
      $tilesetBases = $('#tileset-bases'),
      $modals = $('.modal'),
      tileSize = 32,
      tileSets = [],
      template = 0,
      tilesetsIndex = 0;

  var tilesetTemplate = [];

  //47 tiles template
  tilesetTemplate[0] = {
    map: [1, 2, 3, 2, 3, 4, 1, 4, 1, 2, 3, 2, 3, 4, 8, 9, 8, 9, 8, 9, 7, 14, 14, 8, 8, 10, 7, 10, 7, 5, 6, 5, 6, 10, 14, 5, 6, 5, 6, 15, 13, 14, 14, 8, 8, 16, 13, 16, 13, 11, 12, 11, 12, 16, 8, 11, 12, 11, 12, 9, 7, 8, 8, 8, 14, 10, 7, 10, 7, 5, 6, 5, 6, 10, 14, 5, 6, 5, 6, 9, 13, 8, 8, 8, 14, 16, 13, 16, 13, 11, 12, 11, 12, 16, 14, 11, 12, 11, 12, 9, 19, 20, 21, 20, 21, 22, 19, 22, 19, 20, 21, 20, 21, 22, 14, 15, 15, 15, 15, 15, 1, 2, 3, 2, 3, 4, 1, 4, 2, 3, 9, 10, 7, 9, 2, 3, 8, 11, 12, 8, 19, 20, 21, 20, 21, 22, 19, 22, 9, 5, 6, 16, 13, 5, 6, 9, 6, 5, 6, 5, 0, 0, 0, 0, 9, 11, 12, 9, 7, 11, 12, 9, 9, 11, 12, 10, 12, 11, 12, 11, 0, 0, 0, 0, 6, 9, 9, 5, 13, 9, 20, 21, 20, 21, 9, 16, 8, 5, 6, 8],
    width: 10,
    height: 5
  };

  tilesetTemplate[1] = {
    map: [1, 2, 3, 2, 3, 4, 1, 4, 7, 14, 14, 8, 8, 10, 7, 10, 13, 14, 14, 8, 8, 16, 13, 16, 7, 8, 8, 8, 14, 10, 7, 10, 13, 8, 8, 8, 14, 16, 13, 16, 19, 20, 21, 20, 21, 22, 19, 22, 1, 2, 3, 2, 3, 4, 1, 4, 19, 20, 21, 20, 21, 22, 19, 22],
    width: 4,
    height: 4
  };

  // Array Remove - By John Resig (MIT Licensed)
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  function clearFileInput(fileInput) {
    try {
      fileInput.value = null;
    } catch(ex) { }
    if (fileInput.value) {
      fileInput.parentNode.replaceChild(fileInput.cloneNode(true), fileInput);
    }
  }

  //rezise the canvas tileset and and it's container div
  function tilesetSize(width, height){

    $tileset.width = width;
    $tileset.height = height;

  }

  //draw each peace of the tiles
  function drawTile(sprite, x, y, type){

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
    var h = 0, w = 0, i = 0;

    tilesetSize(
      tilesetTemplate[template].width * tileSize,
      (tilesetTemplate[template].height * tileSize) * tileSets.length
    );

    for (i = 0; i < tileSets.length; i++) {

      for (h = 0; h < tilesetTemplate[template].height * 2; h++) {
        for (w = 0; w < tilesetTemplate[template].width * 2; w++) {

          drawTile(tileSets[i], w, h + (i * (tilesetTemplate[template].height * 2)), tilesetTemplate[template].map[(tilesetTemplate[template].width * 2) * h + w] - 1);

        }
      }

    };

  }

  function removeTileset(tilesetIndex){

    tileSets.remove(tilesetIndex)

  }

  function setModal(button, modal){
    var $modal = $(modal);

    $(button).on('click', function() {

      $modal.toggle();

      return false;
    });

  };

  setModal('#menu-about', '#about');
  setModal('#menu-help', '#help');

  $('.modal .close').on('click', function() {

    $(this).parent().toggle();

  });


  $typeForm.on('change' , function() {
    template = $typeForm.val();
    generate();
  });

  $formTilesize.on('change' , function() {
    tileSize = $formTilesize.val();
    generate();
  });

  $('#download').on('click' , function() {
    console.log($tileset);
    $tileset.toBlob(function(blob) {
      saveAs(blob, "tileset.png");
    });
  });

  $tilesetBases.on('click', '.tileset-base .remove', function() {
    var $this = $(this).parent();

    removeTileset($this.data('index'));

    $this.remove();

    $('.tileset-base').each(function(index) {

      $(this).attr('data-index', index);

    });

    generate();

  });

  $baseInput.on('click', function() {

    $addTileset.click();

  });

  $addTileset.addEventListener('change', function(e) {

    var reader = new FileReader();

    if (this.files && this.files[0]) {

      reader.onload = function(event) {
        var dataUri = event.target.result,
            img = document.createElement('img');

        img.src = dataUri;

        $(
          '<div class="base tileset-base" data-index="'+tileSets.length+'">'+
            '<div class="remove">x</div>'+
            '<img src="'+dataUri+'" id="'+tileSets.length+'">'+
          '</div>'
        ).insertBefore('#base-add');

        tileSets[tileSets.length] = img;

        generate();

      };

      reader.readAsDataURL(this.files[0]);

      clearFileInput(this);

    }

  });

}(window));