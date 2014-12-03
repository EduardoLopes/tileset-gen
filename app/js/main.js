var React = require('react');
var _ = require('lodash');
var TopBar = require('./components/top-bar.js');
var TilesetBasesContainer = require('./components/tileset-bases-container.js');

var TilesetGen = React.createClass({
  currentID: 0,
   getInitialState: function() {

    return {
      tilesets: []
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

         tilesets.unshift({
           uri: dataUri,
           img: img,
           id: this.currentID++
         });

        this.setState({tilesets: tilesets});

      }.bind(this);

    }

  },
  onClose: function(id){

    var newTilesets = _.remove(this.state.tilesets, function(tileset) { return tileset.id != id; });

    this.setState({tilesets: newTilesets});

  },
  render: function() {
    return (
      <div>
        <TopBar/>
        <TilesetBasesContainer tilesets={this.state.tilesets} onClose={this.onClose} handleTilesetUpload={this.handleTilesetUpload} />
      </div>
    );
  }
});

React.render(
  <TilesetGen />,
  document.getElementById('container')
);
