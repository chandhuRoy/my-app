import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from '../../../components/InputField/InputField';
import SelectField from '../../../components/SelectField/SelectField';
import setData from '../../../redux/actions/SetAction/SetAction';
import * as errorMessages from '../../../models/validationErrorMessages';
import * as SelectOptionsHashes from '../../../models/SelectOptionsHashes.json';


class MilitaryId extends Component {
  constructor(props) {
    super(props);
    this.handleDispatch = this.handleDispatch.bind(this);
    this.expirationErrorMessage = null;
  }

  handleDispatch(str, action) {
    const { dispatch } = this.props;
    dispatch(setData(action, str));
  }

  handleBlur() {
    const { YourIdentificationState } = this.props;
    const { militaryExpirationDate } = YourIdentificationState;

    this.dateErrorMessages = [];

    if (militaryExpirationDate && militaryExpirationDate.length === 10) {
      const value = new Date(militaryExpirationDate);
      const dateLesserCompare = value < Date.now();

      this.expirationErrorMessage = null;

      if (dateLesserCompare) {
        this.expirationErrorMessage = errorMessages.invalidExpirationDateMessage;
      }
    }
  }

  render() {
    const { YourIdentificationState, isValidating, invalidRef } = this.props;
    const {
      militaryBranch,
      militaryIdentificationNumber,
      militaryExpirationDate,
    } = YourIdentificationState;

    const getOptions = hash => Object.entries(hash).map(item => ({ key: item[0], value: item[1] }));

    return (
      <div>
        <SelectField
          label='Military Branch'
          onChangeMethod={str => this.handleDispatch(str, 'SET_MILITARY_BRANCH')}
          isValidating={isValidating}
          invalidRef={invalidRef}
          initialValue={militaryBranch}
          options={getOptions(SelectOptionsHashes.militaryBranch)}
        />
        <InputField
          label='ID Number'
          inputType='text'
          validatorOptions={{
            pattern: /^[0-9a-zA-Z]*$/,
            max: 16,
          }}
          isValidating={isValidating}
          initialValue={militaryIdentificationNumber}
          onChangeMethod={str => this.handleDispatch(str, 'SET_MILITARY_IDENTIFICATION_NUMBER')}
          invalidRef={invalidRef}
        />
        <InputField
          label='Expiration Date'
          inputType='text'
          validatorOptions={{
            pattern: /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/,
            autoFormat: 'dateMDY',
          }}
          isValidating={isValidating}
          onChangeMethod={str => this.handleDispatch(str, 'SET_MILITARY_EXPIRATION_DATE')}
          onBlur={this.handleBlur()}
          initialValue={militaryExpirationDate}
          additionalErrorMessages={this.expirationErrorMessage}
          invalidRef={invalidRef}
          hasChinstrap
          chinstrapMessage='MM/DD/YYYY'
        />
      </div>
    );
  }
}

MilitaryId.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isValidating: PropTypes.bool.isRequired,
  invalidRef: PropTypes.func.isRequired,
  YourIdentificationState: PropTypes.shape({
    militaryBranch: PropTypes.string,
    militaryIdentificationNumber: PropTypes.string,
    militaryExpirationDate: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  YourIdentificationState: state.YourIdentificationState,
});

export default connect(mapStateToProps, null)(MilitaryId);