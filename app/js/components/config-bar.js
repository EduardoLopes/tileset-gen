var React = require('react');
var MenuItem = require('./menu-item.js');
var canvasToBlob = require('../vendor/canvasToBlob.js');
var saveAs = require('../vendor/FileSaver.js');


function clearFileInput(fileInput) {
  try {
    fileInput.value = null;
  } catch(ex) { }
  if (fileInput.value) {
    fileInput.parentNode.replaceChild(fileInput.cloneNode(true), fileInput);
  }
}

class ConfigBar extends React.Component{

  constructor(props) {

    super(props);

    this.inputRef = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);


    this.state = {
      data: [
        {
          url: '#',
          name: 'Select All',
          onClick:  function(event){

            event.preventDefault();

            this.props.selectAll();

          }.bind(this)
        },
        {
          url: '#',
          name: 'Upload',
          onClick:  function(event){

            event.preventDefault();

            this.inputRef.current.click();

          }.bind(this)
        },
        {
          url: '#',
          name: 'Download',
          onClick:  function(event){

            event.preventDefault();

            this.props.canvasRef.current.canvas.toBlob(function(blob) {
              saveAs(blob, "tileset.png");
            });

          }.bind(this)
        }
      ]
    };

  }

  handleOnChange(event){

    for (var i = 0; i < event.target.files.length; i++) {
      this.props.onTilesetUpload(event.target.files[i]);
    }

    clearFileInput(event.target);

  }

  render() {

    var menuItens = this.state.data.map(function(item, index) {
      return (
        <MenuItem handleOnClick={item.onClick} url={item.url} key={index}>
          {item.name}
        </MenuItem>
      );

    });

    return (
      <nav className="config-bar clearfix">
        <ul className="menu">
          {menuItens}
          <input ref={this.inputRef} type="file" accept="image/*" className="file-input" onChange={this.handleOnChange} required multiple />
        </ul>
      </nav>
    );
  }

}

module.exports = ConfigBar;
