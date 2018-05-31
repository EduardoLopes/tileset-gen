import React from 'react';

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

    this.handleOnChange = this.handleOnChange.bind(this);

  }

  handleAddClick(){

    this.inputRef.current.click();

  }

  handleOnChange(event){

    for (let i = 0; i < event.target.files.length; i++) {
      this.props.onTilesetUpload(event.target.files[i]);
    }

    clearFileInput(event.target);

  }

  render() {
    return (
      <div className="base add" onClick={this.handleAddClick.bind(this)}>
        Add a new tileset base
        <input ref={this.inputRef} type="file" accept="image/*" className="file-input" onChange={this.handleOnChange} required multiple />
      </div>
    );
  }

}