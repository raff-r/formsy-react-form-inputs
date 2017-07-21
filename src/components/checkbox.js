import React, { Component } from "react";
import PropTypes from 'prop-types';
import FromComponent from '../HOC/form-component';

import ErrorMessages from "./error-messages";

class Checkbox extends Component {

  static propTypes = {
    inputProps: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]),
      checked: PropTypes.bool
    }),
    debounce: PropTypes.shape({
      change: PropTypes.number,
      blur: PropTypes.number
    })
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.currentTarget.checked;
    this.props.handleChange(value);
  }

  render() {
    const {inputProps} = this.props;

    return (
      <div className={`input-checkbox ${this.props.className ? this.props.className : ''}`}>
        <input
          {...inputProps}
          type="checkbox"
          // value={this.props.value}
          // checked={this.props.value === inputProps.value}
          onChange={this.handleChange}
        />
        <label className="input--checkbox__label" htmlFor={inputProps.id}>
          {this.props.label}
        </label>
        {this.props.showError
          ? <ErrorMessages messages={this.props.getErrorMessages()} />
          : null}
      </div>
    );
  }
}

export default FromComponent(Checkbox);
