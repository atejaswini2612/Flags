import React from 'react';

class Checkbox extends React.Component {
    state = {
        isChecked: false
    }
    toggleChange() {
      this.setState({
        isChecked: !this.state.isChecked // flip boolean value
      })
    };

    render() {
        
      return (
        <label>
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.toggleChange} />
          
        </label>
      );
    }
  };
  export default Checkbox;