var React = require('react');
var _ = require('lodash');
var createReactClass = require('create-react-class');

var EditBar = createReactClass({
  handleOnSelectChange: function(){

    this.props.updateTileset(this.props.selected, this.refs.type.value);

  },
  handleTilesizeOnChange: function(){

    this.props.setTilesetSize(this.refs.tilesize.value);

  },
  render: function() {
    var className;
    var defaultSelectValue = 0;

    if(this.props.selected == null){
      className = 'hidden';
    } else {
      className = '';
    }

    var index = _.findIndex(this.props.tilesets, function(tileset) {

      return tileset.id == this.props.selected;

    }.bind(this));

    if(this.props.selected != null && index > -1){
      defaultSelectValue = this.props.tilesets[index].type;
    }

    return (
      <div className="config">
        Tilesize: <input ref='tilesize' onChange={this.handleTilesizeOnChange} id="form-tilesize" defaultValue="32" type="number" step="8" min="8" max="256"/>
        <span className={className}> Type:
          <select ref="type" name="type" id="type" value={defaultSelectValue} onChange={this.handleOnSelectChange}>
            <option value="0">1 - The Blob</option>
            <option value="1">2</option>
            <option value="2">3 - Bitwise</option>
          </select>
        </span>
      </div>
    );
  }
});

module.exports = EditBar;
