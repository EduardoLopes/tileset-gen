import React from 'react';
import Blob from '../vendor/Blob.js';
import _ from 'lodash';
import tilesetTemplate from '../template.js';

export default class MainCanvas extends React.Component {

  constructor(props){

    super(props);

    this.canvasRef = React.createRef();

  }

  drawTile(sprite, x, y, type, tileSize){

    let spriteY = type / 4 >> 0;
    let spriteX = (type - spriteY * 4);

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

    let width = 0;
    let height = 0;

    for (let key in this.props.tilesets) {
      if (this.props.tilesets.hasOwnProperty(key)) {

        let tileset = this.props.tilesets[key];
        width = Math.max(width, tilesetTemplate[tileset.type].width * tileset.tileSize);
        height = tileset.y + tileset.height;

      }
    }

    this.canvas.width = width;
    this.canvas.height = height;

  }

  generateTileset(){

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.setCanvasSize();

    for (let key in this.props.tilesets) {

      if (this.props.tilesets.hasOwnProperty(key)) {

        let tileset = this.props.tilesets[key];

        for (let h = 0; h < tilesetTemplate[tileset.type].height * 2; h++) {

          for (let w = 0; w < tilesetTemplate[tileset.type].width * 2; w++) {

            this.drawTile(
              tileset.img, //sprite
              tileset.x + (w * (tileset.tileSize / 2)), //x
              tileset.y + (h * (tileset.tileSize / 2)), //y
              tilesetTemplate[tileset.type].map[(tilesetTemplate[tileset.type].width * 2) * h + w] - 1, //type
              tileset.tileSize //tileSize
            );

          }

        }

      }

    };

  }

  render() {

    if(this.ctx && Object.keys(this.props.tilesets).length > 0)
      this.generateTileset();
    else if(this.ctx && Object.keys(this.props.tilesets).length == 0)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    return (
      <div className="tilesets-container">
        <canvas className="tilesets-canvas" ref={this.canvasRef}></canvas>
      </div>
    );
  }

}