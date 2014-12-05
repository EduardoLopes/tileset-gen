var React = require('react');

var TilesetBase = React.createClass({
  onClose: function() {

    this.props.close(this.props.id);

  },
  hanldeOnClick: function (event){

    if(this.refs.remove.getDOMNode() != event.target)
      this.props.select(this.props.id);

  },
  render: function() {
    var classNane;

    if(this.props.selected){
      classNane = 'base tileset-base active';
    } else {
      classNane = 'base tileset-base';
    }

    return (
      <div onClick={this.hanldeOnClick} className={classNane}>
        <div ref="remove" onClick={this.onClose} className="remove">x</div>
        <img src={this.props.dataUri} />
      </div>
    );
  }
});

module.exports = TilesetBase;
