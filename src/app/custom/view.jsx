const { h, Component } = require('preact');

require('./styles');

module.exports = class CustomView extends Component {
  constructor({ setCustom, expressionText }) {
    super();

    this.state = {
      value: expressionText
    };
    this.setCustom = setCustom;
    this.setChange = this.setChange.bind(this);
    this.confirmChange = this.confirmChange.bind(this);
  }

  setChange(ev) {
    this.setState({
      value: ev.target.value
    });
  }

  confirmChange() {
    this.setCustom(this.state.value);
  }

  render() {
    return (
      <div className="m-custom">
        <label className="m-custom__input">
          <span className="m-custom__label">Enter expression:</span>
          <input type="text" class="m-custom__field" onchange={this.setChange}/>
        </label>
        <button className="m-custom__submit" onclick={this.confirmChange}>Solve</button>
      </div>
    );
  }
};
