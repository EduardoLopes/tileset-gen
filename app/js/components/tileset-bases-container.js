var React = require('react');
var TilesetBase = require('./tileset-base.js');
var TilesetUpload = require('./tileset-upload.js');

class TilesetBaseContainer extends React.Component {

  render() {

    var tilesetItens = this.props.tilesets.map(function(tileset, index) {
      var selected = false;

      if(this.props.selected == tileset.id){
        selected = true;
      }

      return (
        <TilesetBase selected={selected} select={this.props.selectTileset} close={this.props.onClose} dataUri={tileset.uri} id={tileset.id} key={index} />
      );

    }.bind(this));

    return (
      <div className="tileset-bases">
        {tilesetItens}
        <TilesetUpload onTilesetUpload={this.props.handleTilesetUpload} />
      </div>
    );

  }

}

module.exports = TilesetBaseContainer;
