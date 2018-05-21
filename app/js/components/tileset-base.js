var React = require('react');

class TilesetBase extends React.Component {

  onClose() {

    this.props.close(this.props.id);

  }

  hanldeOnClick(event){

    if(this.refs.remove != event.target)
      this.props.select(this.props.id);

  }

  render () {
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

}

module.exports = TilesetBase;
