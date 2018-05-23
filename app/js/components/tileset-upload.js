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

class TilesetUpload extends React.Component{

  constructor(props) {

    super(props);

    this.inputRef = React.createRef();

  }

  handleAddClick(){

    this.inputRef.current.click();

  }

  handleOnChange(event){

    for (var i = 0; i < event.target.files.length; i++) {
      this.props.onTilesetUpload(event.target.files[i]);
    }

    clearFileInput(event.target);

  }

  render() {
    return (
      <div className="base add" onClick={this.handleAddClick.bind(this)}>
        Add a new tileset base
        <input ref={this.inputRef} type="file" accept="image/*" className="file-input" onChange={this.handleOnChange.bind(this)} required multiple />
      </div>
    );
  }

}

module.exports = TilesetUpload;
