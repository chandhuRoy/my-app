import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import chevronIcon from '../../assets/images/icon-select-chevron.svg';
import { textInputValidation } from '../../lib/validations/validations';

import {
  colors,
  typography,
  breakpoints,
  utils,
} from '../../styles/rds-theme';
import exclamationMarkIcon from '../../assets/images/icon-exclamation-circle.svg';

const StyledSelectWrapper = styled.div`
  display:flex;
  max-width:21.88rem;
`;

const StyledFormGroup = styled.div`
  display: block;
  position: relative;
  color: ${colors.mediumDarkGrey};
  border: 2px solid ${colors.grey};
  min-height: 2.5rem;
  font-size: 1.13rem;
  margin-bottom: 1.875rem;
  width: 100%;
  border: ${props => (props.hasError ? utils.errorBorder : utils.defaultBorder)};
  outline: ${props => (props.hasFocus ? 'thin dotted black' : 'none')};
  outline-offset: ${props => (props.hasFocus ? '2px' : '0')};
  @media ${breakpoints.smMin} {
    max-width: 21.88rem; // 350px
  }

  &:before {
    display: ${props => (props.hasError ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: 1.25rem;
    right: 2.813rem;
    background: url(${exclamationMarkIcon}) no-repeat;
    text-align: center;
    width: 1rem;
    height: 1rem;
  }

  &:after {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 1.563rem;
    right: 0.9rem;
    width: 1em;
    height: 0.5em;
    background: transparent url(${chevronIcon}) no-repeat center center;
    &:focus {
      background-color: ${colors.lifeGreen};
    }
  }
`;

const StyledLabel = styled.label`
  width: auto;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  color: ${props => (props.hasError ? colors.red : colors.mediumDarkGrey)};
  top: ${props => (props.hasValue ? '0.625rem' : '1.25rem')};
  left: 1rem;
  font-size: ${props => (props.hasValue ? typography.fontSizeSmall : typography.fontSizeMedium)};
  transition: all 200ms ease-in-out;
`;

const StyledErrorMessage = styled.p`
  width: auto;
  margin-top: -2px;
  background: ${colors.red};
  padding: 0.63rem 1rem;
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
  font-size: ${typography.baseFontSize};
  border-color: ${props => (props.hasError ? colors.red : colors.grey)};
`;

const StyledSelect = styled.select`
  -webkit-appearance:none;
  padding: 10px;
  border:0;
  margin:0;
  width: 100%;
  background-color: transparent;
  height: auto;
  max-height: 4.25rem;
  padding: 1.875rem 2.94rem 0.3125rem 0.9375rem;
  box-shadow: none;
  z-index:10;
  max-height:4rem;
  font-size: ${typography.fontSizeMedium};
  color: #333;
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

const StyledOption = styled.option`
  padding: 5px;
`;

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOption: false,
      selectedOption: '',
      inputHasValue: false,
      groupHasFocus: false,
      isValid: true,
      errorMessages: [],
    };
    this.fieldRef = null;
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.setFieldRef = this.setFieldRef.bind(this);
    this.updateOption = this.updateOption.bind(this);
  }

  componentDidMount() {
    const { initialValue } = this.props;
    if (initialValue) {
      this.setState({ selectedOption: initialValue });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Handles case where we need to overwrite
    // the current value of an input field
    const {
      isValidating,
      initialValue,
      invalidRef,
      isOptional,
    } = this.props;

    if (nextProps.isValidating !== isValidating) {
      const validatorResult = textInputValidation(initialValue);
      this.setState({
        isValid: validatorResult.isValid,
        errorMessages: validatorResult.errorMessages,
      }, () => {
        const { isValid } = this.state;
        if (!isValid && !isOptional) {
          invalidRef(this.fieldRef);
        }
      });
    }
  }

  onBlur() {
    const { groupHasFocus, selectedOption } = this.state;
    const validatorResult = textInputValidation(selectedOption);
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

  showOptions() {
    const { showOption } = this.state;
    this.setState({ showOption: !showOption });
  }

  updateOption(e) {
    const { onChangeMethod } = this.props;
    this.setState({
      selectedOption: e.target.value,
      inputHasValue: e.target.value.length,
    }, () => {
      const { selectedOption } = this.state;
      onChangeMethod(selectedOption);
    });
  }

  render() {
    const {
      label,
      errorMessage,
      initialValue,
      options,
      hasChinstrap,
      chinstrapMessage,
      isOptional,
    } = this.props;

    const {
      selectedOption,
      inputHasValue,
      groupHasFocus,
      isValid,
      errorMessages,
    } = this.state;

    let errs = null;
    const hasDescribedByValue = hasChinstrap || (errorMessages && errorMessages.length);

    function createUniqueIds() {
      return label.toLowerCase().split(' ').join('_');
    }

    function getDescribedByIds() {
      const idList = [];
      if (hasChinstrap) {
        idList.push('chinstrap_message');
      }
      if (errorMessages) {
        idList.push('error_message');
      }
      return idList.join(' ');
    }

    if (errorMessages) {
      errs = errorMessages.map((error, key) => (
        <StyledErrorMessage
          key={`${createUniqueIds() + key}`}
          id={`error_message_${createUniqueIds()}_${key}`}
          hasMultipleErrors={errorMessages.length > 1}
          aria-live='polite'
        >{error}
        </StyledErrorMessage>
      ));
    }

    return (
      <StyledSelectWrapper>
        <StyledFormGroup
          role='group'
          onClick={() => this.showOptions()}
          hasError={!isValid}
          onFocus={this.onFocus}
          hasFocus={groupHasFocus}
          onBlur={this.onBlur}
        >
          {errorMessage ? (
            <span className='error-icon-mark'>!</span>
          ) : (null)}
          <StyledLabel
            htmlFor={`select_field_${createUniqueIds()}`}
            hasValue={initialValue || inputHasValue}
            hasError={!isValid}
          >
            {label}
          </StyledLabel>

          {options && options.length > 0
            ? (
              <StyledSelect
                onChange={e => this.updateOption(e)}
                id={`select_field_${createUniqueIds()}`}
                value={selectedOption}
                aria-describedby={hasDescribedByValue ? getDescribedByIds() : null}
                innerRef={this.setFieldRef}
                required={!isOptional}
                aria-required={!isOptional}
                aria-invalid={!isValid}
              >
                <StyledOption
                  key={0}
                  defaultValue=''
                />
                {options.map(item => (
                  <StyledOption
                    key={item.value}
                    value={item.value}
                  >
                    {item.value}
                  </StyledOption>))}
              </StyledSelect>
            ) : (null)}
          {errs}
          {hasChinstrap ? (
            <StyledChinstrap
              id={`select_chinstrap_message__${createUniqueIds()}`}
              hasError={!isValid}
            >
              {chinstrapMessage}
            </StyledChinstrap>
          ) : (null)}
        </StyledFormGroup>
      </StyledSelectWrapper>
    );
  }
}

SelectField.defaultProps = {
  errorMessage: null,
  hasChinstrap: false,
  chinstrapMessage: '',
  initialValue: '',
  options: [],
  isOptional: false,
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  hasChinstrap: PropTypes.bool,
  onChangeMethod: PropTypes.func.isRequired,
  chinstrapMessage: PropTypes.string,
  isValidating: PropTypes.bool.isRequired,
  initialValue: PropTypes.string,
  isOptional: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  invalidRef: PropTypes.func.isRequired,
};

export default SelectField;
