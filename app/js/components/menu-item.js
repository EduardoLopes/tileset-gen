var React = require('react');

var MenuItem = React.createClass({
  render: function() {
    return (
      <li className="item">
        <a onClick={this.props.handleOnClick} href="#">
          {this.props.children}
        </a>
      </li>
    );
  }
});

module.exports = MenuItem;
