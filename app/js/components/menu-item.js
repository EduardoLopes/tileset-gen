var React = require('react');
var createReactClass = require('create-react-class');

var MenuItem = createReactClass({
  render: function() {
    return (
      <li className="item">
        <a onClick={this.props.handleOnClick} href={this.props.url} target="_black">
          {this.props.children}
        </a>
      </li>
    );
  }
});

module.exports = MenuItem;
