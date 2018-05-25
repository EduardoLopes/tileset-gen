var React = require('react');

class TilesetBase extends React.Component {

  constructor(props){

    super(props);

  }

  hanldeOnClick(event){

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
        <img src={this.props.dataUri} />
      </div>
    );
  }

}

module.exports = TilesetBase;
