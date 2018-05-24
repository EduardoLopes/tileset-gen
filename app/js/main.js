var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var TopBar = require('./components/top-bar.js');
var TilesetBasesContainer = require('./components/tileset-bases-container.js');
var MainCanvas = require('./components/main-canvas.js');
var EditBar = require('./components/edit-bar.js');

var tilesetTemplate = require('./template.js');

class TilesetGen extends React.Component{

  constructor(props) {

    super(props);

    this.currentID = 0;

    this.state = {
      tilesets: [],
      selectedTileSet: []
    };

    this.handleTilesetUpload = this.handleTilesetUpload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleUpdateTileset = this.handleUpdateTileset.bind(this);
    this.handleSelectTileset = this.handleSelectTileset.bind(this);

    this.lastHeight = 0;
    this.lastY = 0;

  }

  handleTilesetUpload(file){

    var tilesets = this.state.tilesets;

    if (file) {

      reader = new FileReader();
      reader.readAsDataURL(file);

       reader.onload = function(event) {

        var dataUri = event.target.result;
        var img = document.createElement('img');
        img.src = dataUri;

        img.onload = function(){

          var ID = this.currentID++;

          var y = 0;

          if(tilesets.length === 1){

            y = this.lastHeight;

          } else if(tilesets.length >= 1){

            y = this.lastY + this.lastHeight;

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

          this.lastHeight = tilesets[ID].height;
          this.lastY = y;


          this.setState({tilesets: tilesets});

        }.bind(this);


      }.bind(this);

    }

  }

  recalcYPosition(tilesets){

    var y = 0, height = 0, lastY = 0;

    tilesets.forEach(function(tileset){

      y = 0;

      if(tilesets.length === 1){

        y = height;

      } else if(tilesets.length > 1){

        y = lastY + height;

      }

      lastY = y;
      tileset.y = y;
      height = tileset.height;

      this.lastHeight = tileset.height;

    });

  }

  onClose(id){

    _.pullAt(this.state.tilesets, [id]);

    this.recalcYPosition(this.state.tilesets);

    _.pull(this.state.selectedTileSet, id);

    this.setState({
      tilesets: this.state.tilesets,
      selectedTileSet: this.state.selectedTileSet
    });

  }

  handleUpdateTileset(id, type){

    var tilesets = this.state.tilesets, y = 0;

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

  render() {

    return (
      <div>
        <TopBar/>
        <TilesetBasesContainer selected={this.state.selectedTileSet} selectTileset={this.handleSelectTileset} tilesets={this.state.tilesets} onClose={this.onClose} handleTilesetUpload={this.handleTilesetUpload} />
        <EditBar tilesets={this.state.tilesets} updateTileset={this.handleUpdateTileset} selected={this.state.selectedTileSet} />
        <MainCanvas tilesets={this.state.tilesets} />
      </div>
    );
  }

}

ReactDOM.render(
  <TilesetGen />,
  document.getElementById('container')
);
