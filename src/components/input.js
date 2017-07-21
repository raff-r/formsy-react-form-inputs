import React, { Component } from "react";
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

import FromComponent from '../HOC/form-component';

import ErrorMessages from "./error-messages";

const LABEL_PLACEHOLDER_ERROR_MESSAGE = 'You must provide either placeholder or label prop';
const CURRENCY_ERROR_MESSAGE = 'You must provide a currency symbol if type is set to currency';

class Input extends Component {

  static propTypes = {
    inputProps: PropTypes.shape({
      type: PropTypes.oneOf([
        "color",
        "date",
        "datetime",
        "datetime-local",
        "email",
        "hidden",
        "month",
        "number",
        "password",
        "range",
        "search",
        "tel",
        "text",
        "time",
        "url",
        "week",
        "currency"
      ]).isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
    currencySymbol: isRequiredIf(PropTypes.string, props => props.type === 'currency', CURRENCY_ERROR_MESSAGE),
    label: isRequiredIf(PropTypes.string, props => !props.hasOwnProperty('placeholder'), LABEL_PLACEHOLDER_ERROR_MESSAGE),
    placeholder: isRequiredIf(PropTypes.string, props => !props.hasOwnProperty('label'), LABEL_PLACEHOLDER_ERROR_MESSAGE),
    debounce: PropTypes.shape({
      change: PropTypes.number,
      blur: PropTypes.number
    })
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.props.handleChange(value);
  }

  handleBlur(event) {
    const { value } = event.target;
    this.props.handleBlur(value);
  }

  render() {

    const {inputProps} = this.props;
    const optional = (!this.props.isRequired()) ? '(optional)' : '';
    const currencySymbol = (inputProps.type === 'currency') ? <span className="currency-symbol">{this.props.currencySymbol}</span> : null;

    inputProps.type = (inputProps.type === 'currency') ? 'number' : inputProps.type;

    return (
      <div className={`not-radio-checkbox ${this.props.className}`}>
        {currencySymbol}
        <input
          {...inputProps}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <label
          htmlFor={inputProps.id}
          className={`${(inputProps.value) ? 'hidden' : ''}`}
        >
          {this.props.label} {optional}
        </label>
        {this.props.showError
          ? <ErrorMessages messages={this.props.getErrorMessages()} />
          : null}
        {(this.props.helpText) ? <span className="help-text">{this.props.helpText}</span> : null}
        </div>
    );
  }
}

export default FromComponent(Input);