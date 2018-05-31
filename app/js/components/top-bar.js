import React from 'react';
import MenuItem from './menu-item.js';

export default class TopBar extends React.Component{

  constructor(props) {

    super(props);

    this.state = {
      data: [
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
        <span className="title">Tileset Gen <sup>Alpha 0.2.0</sup>  </span>
        <ul className="menu">
          {menuItens}
        </ul>
      </nav>
    );
  }

}