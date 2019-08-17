import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import TopBar from './components/top-bar.js';
import TilesetBasesContainer from './components/tileset-bases-container.js';
import MainCanvas from './components/main-canvas.js';
import EditBar from './components/edit-bar.js';
import ConfigBar from './components/config-bar.js';
import tilesetTemplate from './template.js';

class TilesetGen extends React.Component{

  constructor(props) {

    super(props);

    this.state = {
      tilesets: {},
      selectedTileSet: [],
      currentID: 0,
      lastHeight: 0,
      lastY: 0
    };

    this.handleTilesetUpload = this.handleTilesetUpload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleUpdateTileset = this.handleUpdateTileset.bind(this);
    this.handleSelectTileset = this.handleSelectTileset.bind(this);

    this.canvasRef = React.createRef();

  }

  handleTilesetUpload(file){

    let tilesets = this.state.tilesets;

    if (file) {

      let reader = new FileReader();
      reader.readAsDataURL(file);

       reader.onload = function(event) {

        let dataUri = event.target.result;
        let img = document.createElement('img');
        img.src = dataUri;

        img.onload = function(){

          let ID = this.state.currentID++;

          let y = 0;

          if(Object.keys(tilesets).length === 1){

            y = this.state.lastHeight;

          } else if(Object.keys(tilesets).length >= 1){

            y = this.state.lastY + this.state.lastHeight;

          }

          tilesets[ID] = {
            uri: dataUri,
            img: img,
            id: ID,
            type: 0,
            tileSize: img.naturalWidth / 2,
            x: 0,
            y: y,
            width: 0,
            height: tilesetTemplate[0].height * (img.naturalWidth / 2)
          };

          this.setState({
            lastHeight: tilesets[ID].height,
            lastY: y,
            tilesets: tilesets,
            currentID: this.state.currentID
          });

        }.bind(this);


      }.bind(this);

    }

  }

  recalcYPosition(tilesets){

    let y = 0, height = 0, lastY = 0;

    for (let key in this.state.tilesets) {
      if (this.state.tilesets.hasOwnProperty(key)) {

        let tileset = this.state.tilesets[key];

        y = 0;

        if(Object.keys(tilesets).length === 1){

          y = height;

        } else if(Object.keys(tilesets).length > 1){

          y = lastY + height;

        }

        lastY = y;
        tileset.y = y;
        height = tileset.height;

      }
    };

    this.setState({
      lastHeight: height,
      lastY: y
    });

  }

  onClose(id){

    for (let i = 0; i < this.state.selectedTileSet.length; i++) {

      this.state.tilesets = _.omit(this.state.tilesets, this.state.selectedTileSet[i]);

    }

    this.state.selectedTileSet.length = 0;

    this.recalcYPosition(this.state.tilesets);

    this.setState({
      tilesets: this.state.tilesets,
      selectedTileSet: this.state.selectedTileSet
    });

  }

  handleUpdateTileset(id, type){

    let tilesets = this.state.tilesets, y = 0;

    tilesets[id].type = +type;
    tilesets[id].height = tilesetTemplate[tilesets[id].type].height * tilesets[id].tileSize;

    this.recalcYPosition(tilesets);

    this.setState({tilesets: tilesets});

  }

  handleSelectTileset(id){

    if(_.indexOf(this.state.selectedTileSet, id) <= -1){

      this.state.selectedTileSet.push(id);

    } else {

      _.pull(this.state.selectedTileSet, id);

    }

    this.setState({selectedTileSet: this.state.selectedTileSet});

  }

  selectAll(){

    this.state.selectedTileSet.length = 0;

    for (let key in this.state.tilesets) {

      if (this.state.tilesets.hasOwnProperty(key)) {

        let tileset = this.state.tilesets[key];
        this.state.selectedTileSet.push(tileset.id);

      }

    }

    this.setState({selectedTileSet: this.state.selectedTileSet});

  }

  deselectAll(){

    this.state.selectedTileSet.length = 0;

    this.setState({selectedTileSet: this.state.selectedTileSet});

  }

  importState(file){

    if (file) {

      let reader = new FileReader();
      reader.readAsText(file);

       reader.onload = function(event) {

        let data = JSON.parse(decodeURIComponent(event.target.result));

        let countTilesets = Object.keys(data.tilesets).length - 1;

        for (let key in data.tilesets) {

          if (data.tilesets.hasOwnProperty(key)) {

            let tileset = data.tilesets[key];

            let img = document.createElement('img');
            img.src = tileset.uri;
            data.tilesets[key].img = img;

            img.onload = function(){

              countTilesets--;

              if(countTilesets == 0){

                this.setState({
                  tilesets: {},
                  selectedTileSet: [],
                  currentID: 0,
                  lastHeight: 0,
                  lastY: 0
                });

                this.setState(data);

              }

            }.bind(this);

          }

        }

      }.bind(this);

    }

  }

  render() {

    return (
      <div>
        <TopBar/>
        <ConfigBar selectAll={this.selectAll.bind(this)} deselectAll={this.deselectAll.bind(this)} selected={this.state.selectedTileSet} onTilesetUpload={this.handleTilesetUpload} canvasRef={this.canvasRef} state={this.state} importState={this.importState.bind(this)} />
        <TilesetBasesContainer selected={this.state.selectedTileSet} selectTileset={this.handleSelectTileset} tilesets={this.state.tilesets} />
        <EditBar tilesets={this.state.tilesets} onClose={this.onClose} updateTileset={this.handleUpdateTileset} selected={this.state.selectedTileSet} />
        <MainCanvas ref={this.canvasRef} tilesets={this.state.tilesets} />
      </div>
    );
  }

}

ReactDOM.render(
  <TilesetGen />,
  document.getElementById('container')
);
