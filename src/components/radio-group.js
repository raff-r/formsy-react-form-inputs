import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FromComponent from '../HOC/form-component';

import ErrorMessages from "./error-messages";

class RadioGroup extends Component {

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    groupClassName: PropTypes.string,
    options: React.PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      checked: PropTypes.bool
    })),
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
    const value = event.currentTarget.value;
    this.props.handleChange(value);
  }

  render() {

    const {inputProps} = this.props;

    return (
      <div className={`${this.props.groupClassName ? this.props.groupClassName : ''}`}>
        {this.props.options.map( (option, index) => {
          return (

            <div className={`input-radio ${this.props.className ? this.props.className : ''}`} key={`${this.props.name}-${index}`}>
              <input
                {...option}
                {...inputProps}
                id={`${this.props.name}-${index}`}
                type="radio"
                value={option.value}
                checked={this.props.getValue() === option.value}
                onChange={this.handleChange}
              />
              <label className="input--checkbox__label" htmlFor={`${this.props.name}-${index}`}>
                {option.label}
              </label>
              {this.props.showError
                ? <ErrorMessages messages={this.props.getErrorMessages()} />
                : null}
            </div>

          )
        })}
      </div>
    )
  }
};

export default FromComponent(RadioGroup);