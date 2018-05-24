var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var TopBar = require('./components/top-bar.js');
var TilesetBasesContainer = require('./components/tileset-bases-container.js');
var MainCanvas = require('./components/main-canvas.js');
var EditBar = require('./components/edit-bar.js');
var createReactClass = require('create-react-class');

var tilesetTemplate = require('./template.js');

var TilesetGen = createReactClass({
  currentID: 0,
  getInitialState: function() {

    return {
      tilesets: [],
      selectedTileSet: null
    };

  },
  handleTilesetUpload: function(file){

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

  },
  onClose: function(id){

    var newTilesets = _.remove(this.state.tilesets, function(tileset) { return tileset.id != id; });

    this.setState({tilesets: newTilesets});

    if(this.state.selectedTileSet == id){
      this.setState({selectedTileSet: null});
    }

  },
  handleUpdateTileset: function(id, type){

    var tilesets = this.state.tilesets;

    var index = _.findIndex(this.state.tilesets, function(tileset) {

      return tileset.id == id;
    });

    tilesets[index].type = +type;
    tilesets[index].y = ((tilesetTemplate[0].height * 2) * ID) * tilesets[index].tileSize;
    this.setState({tilesets: tilesets});

  },
  handleSelectTileset: function(id){

    if(this.state.selectedTileSet == id){
      this.setState({selectedTileSet: null});

      return false;
    }

    this.setState({selectedTileSet: id});

  },
  render: function() {

    return (
      <div>
        <TopBar/>
        <TilesetBasesContainer selected={this.state.selectedTileSet} selectTileset={this.handleSelectTileset} tilesets={this.state.tilesets} onClose={this.onClose} handleTilesetUpload={this.handleTilesetUpload} />
        <EditBar tilesets={this.state.tilesets} updateTileset={this.handleUpdateTileset} selected={this.state.selectedTileSet} />
        <MainCanvas tilesets={this.state.tilesets} />
      </div>
    );
  }
});

ReactDOM.render(
  <TilesetGen />,
  document.getElementById('container')
);
