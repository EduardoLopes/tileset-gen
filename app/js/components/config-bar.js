var React = require('react');
var MenuItem = require('./menu-item.js');

class ConfigBar extends React.Component{

  constructor(props) {

    super(props);

    this.state = {
      data: [
        {
          url: '#',
          name: 'Select All',
          onClick:  function(event){

            event.preventDefault();

            this.props.selectAll();

          }.bind(this),
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
      <nav className="config-bar clearfix">
        <ul className="menu">
          {menuItens}
        </ul>
      </nav>
    );
  }

}

module.exports = ConfigBar;
