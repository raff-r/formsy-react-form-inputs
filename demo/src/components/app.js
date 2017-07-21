import React, { Component } from "react";
import { Form } from "formsy-react";

import { Input, Checkbox, RadioGroup, Styles } from "../../../src/";
import '../../../src/styles/base.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data) {
    console.log(data);
  }

  render() {

    const radioOptions = [
      {
        label: 'radio 1',
        value: 'radio1',
      },
      {
        label: 'radio 2',
        value: 'radio2',
      },
      {
        label: 'radio 3',
        value: 'radio3'
      }
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Form onSubmit={this.submitForm} noValidate className="form">
              <Input
                type="text"
                id="signup-first-name"
                name="signupFirstName"
                required
                value=""
                className="input"
                label="First name"
                placeholder="First name"
                validationErrors={{
                  isDefaultRequiredValue: 'This is required'
                }}
              />

              <Input
                type="text"
                id="signup-last-name"
                name="signupLastName"
                value=""
                className="input"
                label="Last name"
              />

              <Input
                type="currency"
                id="signup-other-income"
                name="signupOtherIncome"
                value=""
                currencySymbol="£"
                label="Other income"
                helpText="This is your other annual household income from other factors before tax. Please enter 0 if nothing"
              />

              <Input
                type="text"
                id="signup-email"
                name="signupemail"
                value=""
                required
                label="Email address"
                validations={{
                  isEmail: true,
                }}
                validationErrors={{
                  isEmail: 'You have to type valid email',
                  isDefaultRequiredValue: 'This is required'
                }}
                debounce={{
                  change: 500
                }}
              />

              <Checkbox
                id="singup-checkbox"
                name="signupCheckbox"
                label="Get the free Martin’s email tips too"
                debounce={{
                  change: 0
                }}
              />

              <RadioGroup
                name="signupRadio"
                options={radioOptions}
                className="col-xs"
                groupClassName="row"
                debounce={{
                  change: 0
                }}
              />


              <button
                type="submit">
                Submit
              </button>

            </Form>
          </div>
        </div>
      </div>
    )
  }

}