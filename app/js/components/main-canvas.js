var React = require('react');
var Blob = require('../vendor/Blob.js');
var canvasToBlob = require('../vendor/canvasToBlob.js');
var saveAs = require('../vendor/FileSaver.js');

var tilesetTemplate = [];

//47 tiles template
tilesetTemplate[0] = {
  map: [1, 2, 3, 2, 3, 4, 1, 4, 1, 2, 3, 2, 3, 4, 8, 9, 8, 9, 8, 9, 7, 14, 14, 8, 8, 10, 7, 10, 7, 5, 6, 5, 6, 10, 14, 5, 6, 5, 6, 15, 13, 14, 14, 8, 8, 16, 13, 16, 13, 11, 12, 11, 12, 16, 8, 11, 0, 0, 12, 9, 7, 8, 8, 8, 14, 10, 7, 10, 7, 5, 6, 5, 6, 10, 14, 5, 0, 0, 6, 9, 13, 8, 8, 8, 14, 16, 13, 16, 13, 11, 12, 11, 12, 16, 14, 11, 12, 11, 12, 9, 19, 20, 21, 20, 21, 22, 19, 22, 19, 20, 21, 20, 21, 22, 14, 15, 15, 15, 15, 15, 1, 2, 3, 2, 3, 4, 1, 4, 2, 3, 9, 10, 7, 9, 2, 3, 8, 11, 12, 8, 19, 20, 21, 20, 21, 22, 19, 22, 9, 5, 6, 16, 13, 5, 6, 9, 6, 5, 6, 5, 0, 0, 0, 0, 9, 11, 12, 9, 7, 11, 12, 9, 9, 11, 12, 10, 12, 11, 12, 11, 0, 0, 0, 0, 6, 9, 9, 5, 13, 9, 20, 21, 20, 21, 9, 16, 8, 5, 6, 8],
  width: 10,
  height: 5
};

tilesetTemplate[1] = {
  map: [9, 10, 11, 10, 11, 12, 9, 12, 13, 14, 15, 14, 15, 16, 13, 16, 17, 18, 19, 18, 19, 20, 17, 20, 13, 14, 15, 14, 15, 16, 13, 16, 17, 18, 19, 18, 19, 20, 17, 20, 21, 22, 23, 22, 23, 24, 21, 24, 9, 10, 11, 10, 11, 12, 9, 12, 21, 22, 23, 22, 23, 24, 21, 24],
  width: 4,
  height: 4
};

tilesetTemplate[2] = {
  map: [1, 4, 13, 16, 1, 2, 13, 11, 1, 4, 7, 10, 1, 2, 7, 11, 3, 4, 12, 16, 19, 22, 19, 22, 19, 20, 19, 20, 7, 10, 13, 16, 7, 5, 13, 5, 21, 22, 21, 22, 2, 3, 12, 11, 3, 4, 12, 10, 2, 3, 12, 11, 0, 0, 0, 0, 0, 0, 0, 0, 20, 21, 20, 21, 6, 16, 6, 16, 6, 5, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  width: 10,
  height: 2
};

//tilesetTemplate[3] = {
//  map: [1, 4, 20, 21, 1, 7, 13, 14, 1, 4, 20, 21, 1, 2, 20, 9, 3, 4, 15, 16, 19, 19, 19, 22, 19, 13, 19, 20, 7, 10, 2, 3, 7, 8, 2, 15, 21, 22, 21, 22, 10, 7, 8, 9, 3, 4, 8, 21, 3, 2, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 16, 13, 21, 20, 9, 10, 14, 3, 14, 15, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0],
//  width: 10,
//  height: 2
//};
//
//tilesetTemplate[4] = {
//  map: [8, 9, 1, 9, 8, 9, 7, 9, 8, 9, 1, 9, 8, 9, 13, 9, 8, 4, 2, 3, 14, 15, 8, 9, 19, 15, 13, 15, 22, 15, 14, 22, 20, 21, 19, 20, 14, 15, 14, 15, 8, 4, 1, 2, 8, 10, 3, 4, 8, 16, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 19, 15, 7, 15, 14, 16, 14, 10, 19, 22, 19, 22, 0, 0, 0, 0, 0, 0, 0, 0],
//  width: 10,
//  height: 2
//};

var MainCanvas = React.createClass({
  ctx: null,
  download: function(){

    this.canvas.toBlob(function(blob) {
      saveAs(blob, "tileset.png");
    });

  },
  drawTile: function(sprite, x, y, type){
    var spriteY = type / 4 >> 0;
    var spriteX = (type - spriteY * 4);

    this.ctx.drawImage(
      sprite,
      spriteX * (this.props.tileSize / 2),
      spriteY * (this.props.tileSize / 2),
      (this.props.tileSize / 2),
      (this.props.tileSize / 2),
      (x * (this.props.tileSize / 2)),
      (y * (this.props.tileSize / 2)),
      (this.props.tileSize / 2),
      (this.props.tileSize / 2)
    );

  },
  componentDidMount: function() {

    this.canvas = this.refs.tilesets.getDOMNode();
    this.ctx = this.canvas.getContext('2d');

  },
  setCanvasSize: function(){
    var width = 0;
    var height = 0;

    for (var i = 0; i < this.props.tilesets.length; i++) {
      width = Math.max(width, tilesetTemplate[this.props.tilesets[i].type].width * this.props.tileSize);
      height += (tilesetTemplate[this.props.tilesets[i].type].height * this.props.tileSize);
    }

    this.canvas.width = width;
    this.canvas.height = height;


  },
  generateTileset: function(){
    var height = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var h = 0, w = 0, i = 0;

    this.setCanvasSize();

    for (i = 0; i < this.props.tilesets.length; i++) {

      for (h = 0; h < tilesetTemplate[this.props.tilesets[i].type].height * 2; h++) {

        for (w = 0; w < tilesetTemplate[this.props.tilesets[i].type].width * 2; w++) {

          this.drawTile(this.props.tilesets[i].img, w, height + (0 * (tilesetTemplate[this.props.tilesets[i].type].height * 2)), tilesetTemplate[this.props.tilesets[i].type].map[(tilesetTemplate[this.props.tilesets[i].type].width * 2) * h + w] - 1);

        }

        height +=1;
      }

    };

  },
  render: function() {

    if(this.ctx && this.props.tilesets.length > 0)
      this.generateTileset();
    else if(this.ctx && this.props.tilesets.length == 0)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    return (
      <div className="tilesets-container">
        <canvas className="tilesets-canvas" ref="tilesets"></canvas>
        <button onClick={this.download} className="download">Download</button>
      </div>
    );
  }
});

module.exports = MainCanvas;
