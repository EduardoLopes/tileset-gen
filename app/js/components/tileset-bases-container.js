var React = require('react');
var _ = require('lodash');
var TilesetBase = require('./tileset-base.js');
var TilesetUpload = require('./tileset-upload.js');

class TilesetBaseContainer extends React.Component {

  render() {

    var tilesetItens = [];

    for (var key in this.props.tilesets) {
      if (this.props.tilesets.hasOwnProperty(key)) {
        var tileset = this.props.tilesets[key];

        var selected = false;

        if(_.indexOf(this.props.selected, tileset.id) > -1){
          selected = true;
        }

        tilesetItens.push(<TilesetBase selected={selected} select={this.props.selectTileset} close={this.props.onClose} dataUri={tileset.uri} id={tileset.id} key={tileset.id} />);

      }
    }

    return (
      <div className="tileset-bases">
        {tilesetItens}
      </div>
    );

  }

}

module.exports = TilesetBaseContainer;
