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
      selectedTileSet: null
    };

    this.handleTilesetUpload = this.handleTilesetUpload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleUpdateTileset = this.handleUpdateTileset.bind(this);
    this.handleSelectTileset = this.handleSelectTileset.bind(this);

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

            y = tilesets[tilesets.length - 1].height;

          } else if(tilesets.length >= 1){

            y = tilesets[tilesets.length - 1].y + tilesets[tilesets.length - 1].height;

          }

          tilesets.push({
            uri: dataUri,
            img: img,
            id: ID,
            type: 0,
            tileSize: img.naturalWidth / 2,
            x: 0,
            y: y,
            width: 0,
            height: tilesetTemplate[0].height * (img.naturalWidth / 2)
          });

          this.setState({tilesets: tilesets});

        }.bind(this);


      }.bind(this);

    }

  }

  recalcYPosition(tilesets){

    var y = 0;

    for (var i = 0; i < tilesets.length; i++) {

      y = 0;

      if(tilesets.length === 1){

        if(typeof tilesets[i - 1] !== "undefined"){

          y = tilesets[i - 1].height;

        }

      } else if(tilesets.length > 1){

        if(typeof tilesets[i - 1] !== "undefined"){
          y = tilesets[i - 1].y + tilesets[i - 1].height;
        }

      }

      tilesets[i].y = y;

    }

  }

  onClose(id){

    var newTilesets = _.remove(this.state.tilesets, function(tileset) { return tileset.id != id; });

    this.recalcYPosition(newTilesets);

    this.setState({tilesets: newTilesets});

    if(this.state.selectedTileSet == id){
      this.setState({selectedTileSet: null});
    }

  }

  handleUpdateTileset(id, type){

    var tilesets = this.state.tilesets, y = 0;

    var index = _.findIndex(this.state.tilesets, function(tileset) { return tileset.id == id; });

    if(tilesets.length === 1){

      y = tilesets[index - 1].height;

    } else if(tilesets.length >= 1){

      y = tilesets[index - 1].y + tilesets[index - 1].height;

    }

    tilesets[index].type = +type;
    tilesets[index].y = y;


    this.setState({tilesets: tilesets});

  }

  handleSelectTileset(id){

    if(this.state.selectedTileSet == id){
      this.setState({selectedTileSet: null});

      return false;
    }

    this.setState({selectedTileSet: id});

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
