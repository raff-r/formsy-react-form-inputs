import React, { Component } from "react";
import PropTypes from 'prop-types';
import { HOC } from "formsy-react";

import DefaultProps from "../HOC/defaultProps";
import ErrorMessages from "./error-messages";

class Select extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.props.setValue(value);
  }

  getInputProps(props) {
    let inputProps = Object.assign({}, props);
    DefaultProps.forEach(prop => delete inputProps[prop]);
    delete inputProps.options;
    return inputProps;
  }

  renderOptions(options) {
    return options.map((option, index) => {
      return (
        <option key={index} value={option.value}>{option.label}</option>
      )
    });
  }

  render() {
    const props = this.getInputProps(this.props);

    const errorMessage = this.props.getErrorMessages();
    const className = `select-wrapper ${errorMessage.length
      ? "input--error"
      : ""}`;

    return (
      <div>
        <div className={className}>
          <select
            {...props}
            value={this.props.getValue()}
            onChange={this.handleChange}
          >
            {this.renderOptions(this.props.options)}
          </select>
        </div>
        {this.props.showError()
          ? <ErrorMessages messages={errorMessage} />
          : null}
      </div>
    );
  }
}

export default HOC(Select);