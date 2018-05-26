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

    this.uploadRef = React.createRef();
    this.importRef = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleImportOnChange = this.handleImportOnChange.bind(this);


    this.state = {
      data: [
        {
          url: '#',
          name: 'Export',
          onClick:  function(event){

          var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.state));

          event.target.setAttribute("href",          dataStr);
          event.target.setAttribute("download", "tile-sheet.json");

          }.bind(this)

        },
        {
          url: '#',
          name: 'Import',
          onClick:  function(event){

            event.preventDefault();

            this.importRef.current.click();

          }.bind(this)
        },
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

            this.uploadRef.current.click();

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

  handleImportOnChange(event){

    this.props.importState(event.target.files[0]);

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
          <input ref={this.uploadRef} type="file" accept="image/*" className="file-input" onChange={this.handleOnChange} required multiple />
          <input ref={this.importRef} type="file" accept="application/json" className="file-input" onChange={this.handleImportOnChange} required />
        </ul>
      </nav>
    );
  }

}

module.exports = ConfigBar;
