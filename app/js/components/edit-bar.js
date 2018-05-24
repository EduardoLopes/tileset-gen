var React = require('react');
var _ = require('lodash');

class EditBar extends React.Component {

  handleOnSelectChange(){

    this.props.updateTileset(this.props.selected, this.refs.type.value);

  }

  render() {
    var className;
    var defaultSelectValue = 0;

    if(this.props.selected == null){
      className = 'hidden';
    } else {
      className = '';
    }

    if(this.props.selected != null && this.props.selected > -1){
      defaultSelectValue = this.props.tilesets[this.props.selected].type;
    }

    return (
      <div className="config">
        <span className={className}> Type:
          <select ref="type" name="type" id="type" value={defaultSelectValue} onChange={this.handleOnSelectChange.bind(this)}>
            <option value="0">1 - The Blob</option>
            <option value="1">2</option>
            <option value="2">3 - Bitwise</option>
          </select>
        </span>
      </div>
    );

  }

}

module.exports = EditBar;
