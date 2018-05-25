var React = require('react');
var MenuItem = require('./menu-item.js');

class TopBar extends React.Component{

  constructor(props) {

    super(props);

    this.state = {
      data: [
        {
          url: '#',
          name: 'Download',
          onClick:  function(event){

            event.preventDefault();

          },
        },
        {
          url: 'https://github.com/EduardoLopes/tileset-gen/tree/dev#how-it-works',
          name: 'Help',
          onClick:  function(event){


          },
        },
        {
          url: 'https://github.com/EduardoLopes/tileset-gen/tree/dev#tileset-gen',
          name: 'About',
          onClick: function(event){

          },
        }
      ]
    };

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
      <nav className="top-bar">
        <span className="title">Tileset Gen <sup>Alpha 0.1.1</sup>  </span>
        <ul className="menu">
          {menuItens}
        </ul>
      </nav>
    );
  }

}

module.exports = TopBar;
