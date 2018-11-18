import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from '../../../components/InputField/InputField';
import SelectField from '../../../components/SelectField/SelectField';
import setData from '../../../redux/actions/SetAction/SetAction';
import states from '../../../models/states';
import * as errorMessages from '../../../models/validationErrorMessages';

class StateIssuedId extends Component {
  constructor(props) {
    super(props);
    this.handleDispatch = this.handleDispatch.bind(this);
    this.expirationErrorMessage = null;
    this.issuedErrorMessage = null;
  }

  handleDispatch(str, action) {
    const { dispatch } = this.props;
    dispatch(setData(action, str));
  }

  handleBlur() {
    const { YourIdentificationState } = this.props;
    const { driversLicenseExpirationDate, driversLicenseIssueDate } = YourIdentificationState;

    this.dateErrorMessages = [];

    if (driversLicenseExpirationDate && driversLicenseExpirationDate.length > 9) {
      const value = new Date(driversLicenseExpirationDate);
      const nowDate = new Date();
      const expDateCompare = new Date(nowDate);
      expDateCompare.setDate(nowDate.getDate() - 1);

      const dateLesserCompare = value <= expDateCompare;

      this.expirationErrorMessage = null;

      if (dateLesserCompare) {
        this.expirationErrorMessage = errorMessages.invalidExpirationDateMessage;
      }
    }

    if (driversLicenseIssueDate && driversLicenseIssueDate.length > 9) {
      const value = new Date(driversLicenseIssueDate);
      const dateGreaterCompare = value >= Date.now();

      this.issuedErrorMessage = null;

      if (dateGreaterCompare) {
        this.issuedErrorMessage = errorMessages.invalidIssueDateMessage;
      }
    }
  }

  render() {
    const { YourIdentificationState, isValidating, invalidRef } = this.props;
    const {
      driversLicenseNumber,
      driversLicenseIssueDate,
      driversLicenseExpirationDate,
      driversLicenseStateIssued,
    } = YourIdentificationState;

    return (
      <div>
        <SelectField
          label='State Issued'
          options={states}
          onChangeMethod={str => this.handleDispatch(str, 'SET_STATE_ISSUED')}
          isValidating={isValidating}
          invalidRef={invalidRef}
          initialValue={driversLicenseStateIssued}
        />
        <InputField
          label='State-Issued ID Number'
          inputType='text'
          validatorOptions={{ pattern: /^[0-9a-zA-Z]*$/ }}
          isValidating={isValidating}
          initialValue={driversLicenseNumber}
          onChangeMethod={str => this.handleDispatch(str, 'SET_DRIVERS_LICENSE')}
          invalidRef={invalidRef}
        />
        <InputField
          label='Issue Date'
          inputType='text'
          validatorOptions={{
            pattern: /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/,
            autoFormat: 'dateMDY',
          }}
          isValidating={isValidating}
          onChangeMethod={str => this.handleDispatch(str, 'SET_ISSUE_DATE')}
          onBlur={this.handleBlur()}
          initialValue={driversLicenseIssueDate}
          additionalErrorMessages={this.issuedErrorMessage}
          invalidRef={invalidRef}
          hasChinstrap
          chinstrapMessage='MM/DD/YYYY'
        />
        <InputField
          label='Expiration Date'
          inputType='text'
          validatorOptions={{
            pattern: /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/,
            autoFormat: 'dateMDY',
          }}
          isValidating={isValidating}
          onChangeMethod={str => this.handleDispatch(str, 'SET_EXPIRATION_DATE')}
          initialValue={driversLicenseExpirationDate}
          additionalErrorMessages={this.expirationErrorMessage}
          invalidRef={invalidRef}
          hasChinstrap
          chinstrapMessage='MM/DD/YYYY'
        />
      </div>
    );
  }
}

StateIssuedId.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invalidRef: PropTypes.func.isRequired,
  isValidating: PropTypes.bool.isRequired,
  YourIdentificationState: PropTypes.shape({
    driversLicenseNumber: PropTypes.string,
    driversLicenseIssueDate: PropTypes.string,
    driversLicenseExpirationDate: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  YourIdentificationState: state.YourIdentificationState,
});

export default connect(mapStateToProps, null)(StateIssuedId);