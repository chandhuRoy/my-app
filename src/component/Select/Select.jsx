import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import chevronIcon from '../../assets/images/icon-select-chevron.svg';

import {
  colors,
  typography,
  breakpoints,
} from '../../styles/rds-theme';

const StyledSelectWrapper = styled.div`
  display:flex;
  max-width:21.88rem;
`;

const StyledFormGroup = styled.div`
  color: ${colors.mediumDarkGrey};
  border: 2px solid ${colors.grey};
  display: block;
  min-height:2.5rem;
  font-size:1.13rem;
  position: relative;
  margin-bottom: 1rem;
  margin: 0 auto 2rem;
  width:100%;
  border-color: ${props => (props.hasFocus ? 'black' : colors.grey)};
  outline: ${props => (props.hasFocus ? 'thin dotted black' : 'none')};
  outline-offset: ${props => (props.hasFocus ? '2px' : '0')};

  &::before,
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    top: 1.1rem;
  }
  &::after {
    /*  Custom dropdown arrow */
    content:'';
    display:block;
    background: transparent url(${chevronIcon}) no-repeat center center;
    height: 0.5em;
    right: 0.9rem;
    width: 1em;
    &:focus {
      background-color: ${colors.lifeGreen};
    }
  }
  &::before {
    /*  Custom dropdown arrow cover */
    border-radius: 0 3px 3px 0;
    bottom: 0;
    height: 2.5rem;
    right: 0;
    width: 2.5rem;
  }
  
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

const StyledLabel = styled.label`
  width: auto;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  vertical-align: middle;
  color: ${props => (props.hasError ? colors.red : colors.mediumDarkGrey)};
  left: 1rem;
  top: -0.5rem;
  transition: transform 200ms ease-in-out;
  transform-origin: left center;
  transform: translate3d(0, 0, 0);
  font-size: ${typography.baseFontSize};
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
  font-size: ${typography.baseFontSize};
`;

const StyledUl = styled.select`
  -webkit-appearance:none;
  padding: 10px;
  border:0;
  margin:0;
  width: 100%;
  background-color:transparent;
  height: auto;
  max-height:4.25rem;
  padding: 1.5rem 1rem 0.25rem;
  box-shadow:none;
  z-index:10;
  max-height:4rem;
`;

const StyledLi = styled.option`
  padding: 5px;
`;

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOption: false,
      selectedOption: '',
    };
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    if (defaultValue) {
      this.setState({ selectedOption: defaultValue });
    }
  }

  showOptions() {
    const { showOption } = this.state;
    this.setState({ showOption: !showOption });
  }

  updateOption(e) {
    this.setState({ selectedOption: e });
  }

  render() {
    const {
      label,
      errorMessage,
      defaultValue,
      options,
      hasChinstrap,
      chinstrapMessage,
    } = this.props;
    const {
      selectedOption,
    } = this.state;
    const topValue = selectedOption === '' ? 10 : 3;
    const fontValue = selectedOption === '' ? null : '0.9rem';
    return (
      <StyledSelectWrapper>
        <StyledFormGroup role='group' onClick={() => this.showOptions()}>
          {errorMessage ? (
            <span className='error-icon-mark'>!</span>
          ) : (null)}
          <StyledLabel
            htmlFor='input_field'
            hasValue={defaultValue}
            hasError={errorMessage}
            style={{ top: topValue, fontSize: fontValue }}
          >
            {label}
          </StyledLabel>
          {errorMessage ? (
            <StyledErrorMessage id='error_message'>1{errorMessage}</StyledErrorMessage>
          ) : (null)}
          {hasChinstrap ? (
            <StyledChinstrap id='chinstrap_message'>{chinstrapMessage}</StyledChinstrap>
          ) : (null)}
          {options && options.length > 0
            ? (
              <StyledUl onChange={e => this.updateOption(e.target.value)}>
                <StyledLi
                  key={0}
                  value=''
                >{defaultValue}
                </StyledLi>
                {options.map(item => (
                  <StyledLi
                    key={item.value}
                    value={item.value}
                  >
                    {item.value}
                  </StyledLi>))}
              </StyledUl>
            ) : null}
        </StyledFormGroup>
      </StyledSelectWrapper>
    );
  }
}

SelectField.defaultProps = {
  errorMessage: null,
  hasChinstrap: false,
  chinstrapMessage: '',
  defaultValue: '',
  options: [],
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  hasChinstrap: PropTypes.bool,
  chinstrapMessage: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default SelectField;
