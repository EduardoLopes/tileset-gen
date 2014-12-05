var React = require('react');
var MenuItem = require('./menu-item.js');

var TopBar = React.createClass({
  getInitialState: function() {

    return {
      data: [
        {
          name: 'Help',
          onClick:  function(event){
            event.preventDefault();

          },
        },
        {
          name: 'About',
          onClick: function(event){
            event.preventDefault();

          },
        }
      ]
    };

  },
  componentDidMount: function() {

  },


  render: function() {

    var menuItens = this.state.data.map(function(item, index) {
      return (
        <MenuItem handleOnClick={item.onClick} key={index}>
          {item.name}
        </MenuItem>
      );

    });

    return (
      <nav className="top-bar">
        <span className="title">Tileset Gen <sup>Alpha 0.0.9</sup>  </span>
        <ul className="menu">
          {menuItens}
        </ul>
      </nav>
    );
  }
});

module.exports = TopBar;
