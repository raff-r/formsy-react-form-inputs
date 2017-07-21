import React, {Component} from 'react';
import { HOC } from "formsy-react";
import debounce from 'lodash/debounce';
import classnames from 'classnames';

import DefaultProps from "./defaultProps";

export default function(ComposedComponent) {

  class FormComponent extends Component {

    constructor(props) {

      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);

      this.state = {
        value: props.checked || props.value || ''
      };

      this.changeDebounced = debounce(this.props.setValue, this.getDebounceInterval('change'));
      this.blurDebounced = debounce(this.props.setValue, this.getDebounceInterval('blur'));

    }

    getDebounceInterval = (eventName) => {
      if (this.props.debounce && this.props.debounce.hasOwnProperty(eventName)) {
        return this.props.debounce[eventName];
      }
      return 0;
    };

    handleChange(value) {
      this.setState({value});
      this.changeDebounced(value);
    }

    handleBlur(value) {
      this.setState({value});
      this.changeDebounced.cancel();
      this.blurDebounced(value);
    }

    getInputProps() {
      let inputProps = Object.assign({}, this.props, (!this.props.checked) ? this.state : null);
      DefaultProps.forEach(prop => delete inputProps[prop]);
      return inputProps;
    }

    showError() {
      return !!(this.props.getErrorMessages().length && !this.props.isPristine()); //not using formsy react showError as it doesn't check if is pristine
    }

    render() {

      const propsForElement = {
        ...this.props,
        showError: this.showError(),
        className: classnames({
          'form-input': true,
          [`${this.props.className}`]: this.props.className,
          'has-errors': this.showError()
        }),
        handleBlur: this.handleBlur,
        handleChange: this.handleChange,
        inputProps: this.getInputProps()
      };

      return <ComposedComponent {...propsForElement} />
    }

  }

  return HOC(FormComponent);

}