var React = require('react');
var createReactClass = require('create-react-class');

function clearFileInput(fileInput) {
  try {
    fileInput.value = null;
  } catch(ex) { }
  if (fileInput.value) {
    fileInput.parentNode.replaceChild(fileInput.cloneNode(true), fileInput);
  }
}

var TilesetUpload = createReactClass({
  handleAddClick: function(){

    this.refs.input.click();

  },

  handleOnChange: function(event){

    this.props.onTilesetUpload(event.target.files[0]);

    clearFileInput(event.target);

  },

  render: function() {
    return (
      <div className="base add" onClick={this.handleAddClick}>
        Add a new tileset base
        <input ref="input" type="file" accept="image/*" className="file-input" onChange={this.handleOnChange} />
      </div>
    );
  }
});

module.exports = TilesetUpload;
