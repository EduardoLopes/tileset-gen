var React = require('react');
var _ = require('lodash');

class EditBar extends React.Component {

  handleOnSelectChange(){

    this.props.selected.forEach(function(selected){

      if(this.refs.type.value != -1){
        this.props.updateTileset(selected, this.refs.type.value);
      }

    }.bind(this));

  }

  render() {

    var className;
    var defaultSelectValue = 0;

    if(this.props.selected == null){
      className = 'hidden';
    } else {
      className = '';
    }

    if(this.props.selected.length >= 1){

      var allTheSame = true;

      for (var i = 0; i < this.props.selected.length; i++) {

        if(this.props.tilesets[this.props.selected[i]].type != this.props.tilesets[this.props.selected[0]].type){

          allTheSame = false;

        }

      }

      if(this.props.selected != null && this.props.selected > -1){
        defaultSelectValue = this.props.tilesets[this.props.selected[0]].type;
      } else {

        if(allTheSame == true){
          defaultSelectValue = this.props.tilesets[this.props.selected[0]].type;
        } else {
          defaultSelectValue = -1;
        }

      }

    }


    return (
      <div className="config">
        <span className={className}> Type:
          <select ref="type" name="type" id="type" value={defaultSelectValue} onChange={this.handleOnSelectChange.bind(this)}>
            <option value="-1">------------</option>
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
