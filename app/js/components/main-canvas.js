var React = require('react');
var Blob = require('../vendor/Blob.js');
var canvasToBlob = require('../vendor/canvasToBlob.js');
var saveAs = require('../vendor/FileSaver.js');

var tilesetTemplate = require('../template.js');

class MainCanvas extends React.Component {

  constructor(props){

    super(props);

    this.canvasRef = React.createRef();

  }

  download(){

    this.canvas.toBlob(function(blob) {
      saveAs(blob, "tileset.png");
    });

  }

  drawTile(sprite, x, y, type, tileSize){

    var spriteY = type / 4 >> 0;
    var spriteX = (type - spriteY * 4);

    this.ctx.drawImage(
      sprite,
      spriteX * (tileSize / 2),
      spriteY * (tileSize / 2),
      (tileSize / 2),
      (tileSize / 2),
      (x),
      (y),
      (tileSize / 2),
      (tileSize / 2)
    );

  }

  componentDidMount() {

    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

  }

  setCanvasSize(){

    var width = 0;
    var height = 0;

    for (var i = 0; i < this.props.tilesets.length; i++) {
      width = Math.max(width, tilesetTemplate[this.props.tilesets[i].type].width * this.props.tilesets[i].tileSize);
      //height += Math.max(width, tilesetTemplate[this.props.tilesets[i].type].width * this.props.tilesets[i].tileSize);
    }

    height = this.props.tilesets[this.props.tilesets.length - 1].y + this.props.tilesets[this.props.tilesets.length - 1].height;

    this.canvas.width = width;
    this.canvas.height = height;

  }

  generateTileset(){

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var h = 0, w = 0, i = 0;

    this.setCanvasSize();

    for (i = 0; i < this.props.tilesets.length; i++) {


      for (h = 0; h < tilesetTemplate[this.props.tilesets[i].type].height * 2; h++) {

        for (w = 0; w < tilesetTemplate[this.props.tilesets[i].type].width * 2; w++) {

          this.drawTile(
            this.props.tilesets[i].img, //sprite
            this.props.tilesets[i].x + (w * (this.props.tilesets[i].tileSize / 2)), //x
            this.props.tilesets[i].y + (h * (this.props.tilesets[i].tileSize / 2)), //y
            tilesetTemplate[this.props.tilesets[i].type].map[(tilesetTemplate[this.props.tilesets[i].type].width * 2) * h + w] - 1, //type
            this.props.tilesets[i].tileSize //tileSize
          );

        }

      }

    };

  }

  render() {

    if(this.ctx && this.props.tilesets.length > 0)
      this.generateTileset();
    else if(this.ctx && this.props.tilesets.length == 0)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    return (
      <div className="tilesets-container">
        <canvas className="tilesets-canvas" ref={this.canvasRef}></canvas>
        <button onClick={this.download.bind(this)} className="download">Download</button>
      </div>
    );
  }

}

module.exports = MainCanvas;
