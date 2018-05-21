var React = require('react');

class MenuItem extends React.Component {

  render() {
    return (
      <li className="item">
        <a onClick={this.props.handleOnClick} href={this.props.url} target="_black">
          {this.props.children}
        </a>
      </li>
    );
  }

}

module.exports = MenuItem;
