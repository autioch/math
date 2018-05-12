import { h, Component } from 'preact';

import './styles';

export default class CustomView extends Component {
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
          <div className="m-custom__label">Enter expression:</div>
          <input type="text" class="m-custom__field" value={this.state.value} onchange={this.setChange}/>
        </label>
        <button className="m-custom__submit" onclick={this.confirmChange}>Solve</button>
      </div>
    );
  }
}
