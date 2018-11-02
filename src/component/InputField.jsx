import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import {
  colors,
  typography,
  utils,
  breakpoints,
} from './rds-theme';

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
  .error-icon-mark {
    position: absolute;
    top: 18px;
    right: 13px;
    font-size: 13px;
    line-height: 1.3;
    text-align: center;
    font-weight: 700;
    background: ${colors.red};
    border-radius: 1000em;
    width: 16px;
    height: 16px;
    color: white;
  }
`;

const StyledInput = styled.input`
  font-size: ${typography.baseFontSize};
  padding: 25px 20px 5px 15px;
  display: block;
  width: auto;
  border: ${props => (props.hasError ? '2px solid #cc2233' : utils.defaultBorder)};
  border-radius: ${utils.borderRadius};
  color: ${colors.darkGrey};
  &:focus {
    outline: none;
  }

  &:focus ~ label {
    top: 10px;
    font-size: ${typography.fontSizeSmall};
  }

  &:focus ~ label::before {
    width: 5px;
    height: 5px;
  }

`;

const StyledLabel = styled.label`
  width: auto;
  font-size: ${typography.fontSizeLarge};
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  color: ${props => (props.hasError ? colors.red : colors.mediumDarkGrey)};
  left: 16px;
  top: ${props => (props.hasValue ? '10px' : '17px')};
  font-size: ${props => (props.hasValue ? typography.fontSizeSmall : typography.baseFontSize)};
  transition: all 200ms ease-in-out;
`;

const StyledErrorMessage = styled.p`
  width: auto;
  margin-top: -2px;
  background: ${colors.red};
  padding: 20px 10px;
  color: white;
  font-size: ${typography.baseFontSize};
`;

const StyledChinstrap = styled.p`
  width: auto;
  margin-top: -2px;
  background: ${colors.lightGrey};
  padding: 10px;
  color: ${colors.mediumDarkGrey};
  line-height: ${typography.lineHeightSmall};
  border: ${utils.defaultBorder};
  font-size: ${typography.baseFontSize};
`;

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      inputHasValue: false,
      groupHasFocus: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
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
    const { overwriteValue, inputType } = this.props;
    if (inputType === 'text' || inputType === 'email' || inputType === 'tel') {
      if (nextProps.overwriteValue !== overwriteValue) {
        this.setState({ value: nextProps.overwriteValue });
      }
    }
  }

  onBlur() {
    const { groupHasFocus } = this.state;
    if (groupHasFocus) {
      this.setState({ groupHasFocus: false });
    }
  }

  onFocus() {
    const { groupHasFocus } = this.state;
    if (!groupHasFocus) {
      this.setState({ groupHasFocus: true });
    }
  }

  handleChange(event) {
    const { onChangeMethod } = this.props;
    this.setState(
      {
        value: event.target.value,
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
      errorMessage,
      hasChinstrap,
      chinstrapMessage,
      isOptional,
      initialValue,
    } = this.props;
    const { value, inputHasValue, groupHasFocus } = this.state;

    function getDescribedByIds() {
      const idList = [];
      if (hasChinstrap) {
        idList.push('chinstrap_message');
      }
      if (errorMessage) {
        idList.push('error_message');
      }
      return idList.join(' ');
    }

    return (
      <StyledFormGroup role='group' onBlur={this.onBlur} onFocus={this.onFocus} hasFocus={groupHasFocus}>
        <StyledInput
          id='input_field'
          name='input_field'
          type={inputType}
          value={value}
          onChange={this.handleChange}
          hasError={errorMessage}
          required={!isOptional}
          aria-required={!isOptional}
          aria-invalid={errorMessage && errorMessage.length > 0}
          aria-describedby={getDescribedByIds()}
        />
        {errorMessage ? (
          <span className='error-icon-mark'>!</span>
        ) : (null)}
        <StyledLabel
          htmlFor='input_field'
          hasValue={initialValue || inputHasValue}
          hasError={errorMessage}
        >
          {label}
        </StyledLabel>
        {errorMessage ? (
          <StyledErrorMessage id='error_message'>{errorMessage}</StyledErrorMessage>
        ) : (null)}
        {hasChinstrap ? (
          <StyledChinstrap id='chinstrap_message'>{chinstrapMessage}</StyledChinstrap>
        ) : (null)}
      </StyledFormGroup>
    );
  }
}

SelectField.defaultProps = {
  errorMessage: null,
  hasChinstrap: false,
  chinstrapMessage: '',
  isOptional: false,
  overwriteValue: null,
  initialValue: '',
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  onChangeMethod: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  hasChinstrap: PropTypes.bool,
  chinstrapMessage: PropTypes.string,
  isOptional: PropTypes.bool,
  overwriteValue: PropTypes.string,
  initialValue: PropTypes.string,
};

export default SelectField;
