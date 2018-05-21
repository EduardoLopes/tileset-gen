var React = require('react');

class TilesetBase extends React.Component {

  onClose() {

    this.props.close(this.props.id);

    this.removeRef = React.createRef();

  }

  hanldeOnClick(event){

    if(this.removeRef != event.target)
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
      <div onClick={this.hanldeOnClick.bind(this)} className={classNane}>
        <div ref={this.removeRef} onClick={this.onClose.bind(this)} className="remove">x</div>
        <img src={this.props.dataUri} />
      </div>
    );
  }

}

module.exports = TilesetBase;
