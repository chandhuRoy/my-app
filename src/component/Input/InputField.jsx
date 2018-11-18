import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import {
  colors,
  typography,
  utils,
  breakpoints,
} from '../../styles/rds-theme';
import * as validations from '../../lib/validations/validations';
import autoFormatter from '../../lib/autoFormatter/autoFormatter';
import exclamationMarkIcon from '../../assets/images/icon-exclamation-circle.svg';

const {
  textInputValidation,
  emailInputValidation,
  phoneInputValidation,
} = validations;

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1.875rem;
  border-color: ${props => (props.hasFocus ? 'black' : 'transparent')};
  outline: ${props => (props.hasFocus ? 'thin dotted black' : 'none')};
  outline-offset: ${props => (props.hasFocus ? '2px' : '0')};;
  @media ${breakpoints.smMin} {
    max-width: 21.88rem; // 350px
  }
  &:before {
    display: ${props => (props.hasError ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: 1.25rem;
    right: 1.438rem;
    background: url(${exclamationMarkIcon}) no-repeat;
    text-align: center;
    width: 1rem;
    height: 1rem;
  }
`;

const StyledInput = styled.input`
  display: block;
  width: auto;
  font-size: ${typography.fontSizeMedium};
  padding: 1.875rem 1.25rem 0.3125rem 0.9375rem;
  margin: 0;
  border: ${props => (props.hasError ? utils.errorBorder : utils.defaultBorder)};
  border-radius: ${utils.borderRadius};
  color: ${colors.darkGrey};
  &:focus {
    outline: none;
  }

  &:focus ~ label {
    top: 0.625rem;
    font-size: ${typography.fontSizeSmall};
  }

  &:focus ~ label::before {
    width: 0.3125rem;
    height: 0.3125rem;
  }

`;

const StyledLabel = styled.label`
  width: auto;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  color: ${props => (props.hasError ? colors.red : colors.mediumDarkGrey)};
  left: 1rem;
  top: ${props => (props.hasValue ? '0.625rem' : '1.3rem')};
  font-size: ${props => (props.hasValue ? typography.fontSizeSmall : typography.fontSizeMedium)};
  transition: all 200ms ease-in-out;
`;

const StyledErrorMessage = styled.p`
  display: block;
  width: auto;
  margin-top: -2px;
  background: ${colors.red};
  padding: 0.63rem 1rem;
  color: white;
  font-size: ${typography.baseFontSize};
  line-height: ${typography.lineHeightBase};
  border-radius: 0 0 2px 2px;
`;

const StyledChinstrap = styled.p`
  display: block;
  width: auto;
  margin-top: -2px;
  background: ${colors.lightGrey};
  padding: 0.625rem;
  color: ${colors.mediumDarkGrey};
  line-height: ${typography.lineHeightSmall};
  border: ${utils.defaultBorder};
  font-size: ${typography.baseFontSize};
  border-radius: 0 0 2px 2px;
  border-color: ${props => (props.hasError ? colors.red : colors.grey)};
`;

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      inputHasValue: false,
      groupHasFocus: false,
      isValid: true,
      errorMessages: [],
    };
    this.fieldRef = null;
    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.setFieldRef = this.setFieldRef.bind(this);
  }

  componentDidMount() {
    const { initialValue } = this.props;
    if (initialValue) {
      this.setState({ value: initialValue });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Handles case where we need to overwrite
    // the current value of an input field
    const {
      overwriteValue,
      inputType,
      isValidating,
      initialValue,
      invalidRef,
      isOptional,
      additionalErrorMessages,
    } = this.props;

    if (inputType === 'text' || inputType === 'email' || inputType === 'tel') {
      if (nextProps.overwriteValue !== overwriteValue) {
        this.setState({
          value: '',
          isValid: true,
          errorMessages: [],
        });
      }
    }
    if (nextProps.isValidating !== isValidating) {
      const validatorResult = this.runValidator(initialValue, inputType, isOptional);
      const errs = additionalErrorMessages && additionalErrorMessages.length;

      this.setState({
        isValid: !errs && validatorResult.isValid,
        errorMessages: !errs ? validatorResult.errorMessages : [additionalErrorMessages],
      }, () => {
        const { isValid } = this.state;
        if (!isValid && !isOptional) {
          invalidRef(this.fieldRef);
        }
      });
    }
  }

  onBlur(inputType) {
    const { additionalErrorMessages } = this.props;
    const { groupHasFocus, value } = this.state;
    const validatorResult = this.runValidator(value, inputType);

    if (additionalErrorMessages) {
      validatorResult.errorMessages.push(additionalErrorMessages);
      validatorResult.isValid = false;
    }

    this.setState({
      isValid: validatorResult.isValid,
      errorMessages: validatorResult.errorMessages,
      groupHasFocus: !groupHasFocus,
    });
  }

  onFocus() {
    const { groupHasFocus } = this.state;
    if (!groupHasFocus) {
      this.setState({ groupHasFocus: true });
    }
  }

  setFieldRef(el) {
    this.fieldRef = el;
  }

  runValidator(str, type, isOptional = false) {
    const { validatorOptions } = this.props;

    switch (type) {
      case 'text': return textInputValidation(str, validatorOptions);
      case 'email': return emailInputValidation(str, validatorOptions);
      case 'tel':
        if (isOptional) {
          return { isEmpty: false, isValid: true, errorMessages: null };
        }
        return phoneInputValidation(str, validatorOptions);

      default: return textInputValidation(str, validatorOptions);
    }
  }

  handleChange(event) {
    const { onChangeMethod, validatorOptions } = this.props;
    let formattedValue;
    if (validatorOptions.autoFormat) {
      formattedValue = autoFormatter(event.target.value)[validatorOptions.autoFormat];
    }
    this.setState(
      {
        value: formattedValue || event.target.value,
        inputHasValue: event.target.value.length,
      },
      () => {
        const { value } = this.state;
        onChangeMethod(value);
      },
    );
  }

  render() {
    const {
      label,
      inputType,
      hasChinstrap,
      chinstrapMessage,
      isOptional,
      initialValue,
    } = this.props;

    const {
      value,
      inputHasValue,
      groupHasFocus,
      isValid,
      errorMessages,
    } = this.state;

    const hasDescribedByValue = hasChinstrap || (errorMessages && errorMessages.length);

    function createUniqueIds() {
      return label.toLowerCase().split(' ').join('_');
    }

    function getDescribedByIds() {
      const idList = [];
      if (hasChinstrap) {
        idList.push(`chinstrap_message_${createUniqueIds()}`);
      }
      if (errorMessages) {
        idList.push(`error_message_${createUniqueIds()}`);
      }
      return idList.join(' ');
    }

    return (
      <StyledFormGroup
        role='group'
        onBlur={() => this.onBlur(inputType)}
        onFocus={this.onFocus}
        hasFocus={groupHasFocus}
        hasError={!isValid}
      >
        <StyledInput
          id={`input_field_${createUniqueIds()}`}
          name={`input_field_${createUniqueIds()}`}
          type={inputType}
          value={value}
          innerRef={this.setFieldRef}
          onChange={e => this.handleChange(e)}
          hasError={!isValid}
          required={!isOptional}
          aria-required={!isOptional}
          aria-invalid={!isValid}
          aria-describedby={hasDescribedByValue ? getDescribedByIds() : null}
          aria-labelledby={`label_field_${createUniqueIds()}`}
        />
        <StyledLabel
          id={`label_field_${createUniqueIds()}`}
          htmlFor={`input_field_${createUniqueIds()}`}
          hasValue={initialValue || inputHasValue}
          hasError={!isValid}
        >
          {label}
        </StyledLabel>
        {errorMessages ? (
          <div id={`error_message_${createUniqueIds()}`}>
            {errorMessages.map((error, key) => (
              <StyledErrorMessage
                key={`${createUniqueIds() + key}`}
                hasMultipleErrors={errorMessages.length > 1}
                aria-live='polite'
              >{error}
              </StyledErrorMessage>
            ))}
          </div>
        ) : (null)}
        {hasChinstrap ? (
          <StyledChinstrap
            id={`chinstrap_message_${createUniqueIds()}`}
            hasError={!isValid}
          >{chinstrapMessage}
          </StyledChinstrap>
        ) : (null)}
      </StyledFormGroup>
    );
  }
}

const defaultValidatorProps = {
  isRequired: true,
  isAlphaOnly: false,
  isNumberOnly: false,
  pattern: null,
  min: 0,
  max: null,
  autoFormat: '',
};

InputField.defaultProps = {
  validatorOptions: defaultValidatorProps,
  hasChinstrap: false,
  chinstrapMessage: '',
  isOptional: false,
  overwriteValue: null,
  initialValue: '',
  additionalErrorMessages: null,
};

/**
* InputField (
  label,
  inputType,
  validatorOptions,
  isValidating,
  onChangeMethod
) { Component } - Renders a HTML <input> field element and runs validation on string value

*  (required params):
*  label:             { String } -   Label value for the input
*  inputType:         { String } -   Type of input to render.
*                                    Possible values: {'text', 'email', 'tel', 'number', 'password'}
*  validatorOptions:  { Object }   - Object of options to pass to validator
*  isValidating:      { Boolean }  - Triggered on submit, determines when to get erroneous fields
*  onChangeMethod:    { Function } - Event function to pass up to parent component.
*  ------
*  (optional params):
*  validatorOptions:  { Object }   - Object of options to pass to validator
*  hasChinstrap:      { Boolean } -  Renders a chinstrap info box under the field.
*  isOptional:        { Boolean }  - Determines if field is not required.
*  overwriteValue:    { String }  -  Used when its necessary to toggle between 2 required fields.
*  initialValue:      { String } -   Repopulated value that was stored globally (Redux)
*  autoFormat:        { String } -   Runs autoFormatter on each keystroke. Param can be either
*                                    'ssn', 'dateMY', dateMDY', or 'phone'.

*/

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  validatorOptions: PropTypes.shape({
    isRequired: PropTypes.bool,
    isAlphaOnly: PropTypes.bool,
    isNumberOnly: PropTypes.bool,
    pattern: PropTypes.instanceOf(RegExp),
    min: PropTypes.number,
    max: PropTypes.number,
    autoFormat: PropTypes.string,
  }),
  isValidating: PropTypes.bool.isRequired,
  onChangeMethod: PropTypes.func.isRequired,
  hasChinstrap: PropTypes.bool,
  chinstrapMessage: PropTypes.string,
  isOptional: PropTypes.bool,
  overwriteValue: PropTypes.string,
  initialValue: PropTypes.string,
  invalidRef: PropTypes.func.isRequired,
  additionalErrorMessages: PropTypes.string,
};

export default InputField;
