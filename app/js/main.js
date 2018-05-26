var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var TopBar = require('./components/top-bar.js');
var TilesetBasesContainer = require('./components/tileset-bases-container.js');
var MainCanvas = require('./components/main-canvas.js');
var EditBar = require('./components/edit-bar.js');
var ConfigBar = require('./components/config-bar.js');

var tilesetTemplate = require('./template.js');

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

    var tilesets = this.state.tilesets;

    if (file) {

      reader = new FileReader();
      reader.readAsDataURL(file);

       reader.onload = function(event) {

        var dataUri = event.target.result;
        var img = document.createElement('img');
        img.src = dataUri;

        img.onload = function(){

          var ID = this.state.currentID++;

          var y = 0;

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

    var y = 0, height = 0, lastY = 0;

    for (var key in this.state.tilesets) {
      if (this.state.tilesets.hasOwnProperty(key)) {

        var tileset = this.state.tilesets[key];

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

    for (var i = 0; i < this.state.selectedTileSet.length; i++) {

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

  selectAll(){

    this.state.selectedTileSet.length = 0;

    for (var key in this.state.tilesets) {

      if (this.state.tilesets.hasOwnProperty(key)) {

        var tileset = this.state.tilesets[key];
        this.state.selectedTileSet.push(tileset.id);

      }

    }

    this.setState({selectedTileSet: this.state.selectedTileSet});

  }

  importState(file){

    if (file) {

      reader = new FileReader();
      reader.readAsText(file);

       reader.onload = function(event) {

        var data = JSON.parse(decodeURIComponent(event.target.result));

        var countTilesets = Object.keys(data.tilesets).length - 1;

        for (var key in data.tilesets) {

          if (data.tilesets.hasOwnProperty(key)) {

            var tileset = data.tilesets[key];

            var img = document.createElement('img');
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
        <ConfigBar selectAll={this.selectAll.bind(this)} selected={this.state.selectedTileSet} onTilesetUpload={this.handleTilesetUpload} canvasRef={this.canvasRef} state={this.state} importState={this.importState.bind(this)} />
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
