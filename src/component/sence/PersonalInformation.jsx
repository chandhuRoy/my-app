import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import validator from 'validator';
import { colors, typography, breakpoints } from '../../styles/rds-theme';
import PageHeader from '../../components/PageHeader/PageHeader';
import PersonalAvatar from '../../components/PersonalAvatar/PersonalAvatar';
import InputField from '../../components/InputField/InputField';
// import SelectField from '../../components/Select/SelectField';
import setData from '../../redux/actions/ContactInformationActions';
import DateOfBirthFormat from '../../models/DateOfBirthFormat';
import WizardFooterNav from '../../components/WizardFooterNav/WizardFooterNav';

const StyledContactInformation = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 0;
  @media ${breakpoints.smMin} {
    padding: 3rem;
    width: 100%;
  }
  .page-content-wrapper {
    padding: 1rem 6rem;
    @media ${breakpoints.xsMinMax} {
      padding: 1rem;
    }
  }
`;

const StyledContentWrapper = styled.div`
  padding: 0 2rem;
  font-family: ${typography.baseFontFamily};
  color: ${colors.darkGrey};
  @media ${breakpoints.smMin} {
    padding: 0 6rem;
  }
  .content-subheading {
    line-height: 1.3;
    font-size: 1.125rem;
    @media ${breakpoints.xsMinMax} {
      margin-top: 1rem;
    }
  }
`;

const StyledFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  .instructional-text {
    font-size:1.125rem;
    /* font-size: ${typography.fontSizeSmall}; */
    color: ${colors.DarkGrey};
    margin-bottom: 1rem;
  }
`;

const requiredFieldErrorMessage = 'This field is required, please enter a value.';
// const invalidEmailErrorMessage = 'A valid email is required, please try again.';
// const invalidPhoneErrorMessage = 'Please enter a valid phone number.';

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSocialSecurityNumberValid: true,
      isFormValid: false,

    };
    // this.handleFirstNameValidation = this.handleFirstNameValidation.bind(this);
    // this.handleLastNameValidation = this.handleLastNameValidation.bind(this);
    this.handleSocialSecurityNumberValidation = this
      .handleSocialSecurityNumberValidation.bind(this);
    // this.handleMobilePhoneValidation = this.handleMobilePhoneValidation.bind(this);
    // this.handlePrimaryPhoneValidation = this.handlePrimaryPhoneValidation.bind(this);
    // this.handleMobileCheck = this.handleMobileCheck.bind(this);
  }

  componentDidMount() {
    const { ContactInformationState } = this.props;
    this.handleFormValidation(ContactInformationState);
  }

  componentWillReceiveProps(nextProps) {
    const { ContactInformationState } = this.props;
    if (nextProps.ContactInformationState !== ContactInformationState) {
      // Checks if entire form is valid
      this.handleFormValidation(nextProps.ContactInformationState);
    }
  }

  handleSocialSecurityNumberValidation(str) {
    const { dispatch } = this.props;
    const isStrEmpty = validator.isEmpty(str);
    this.setState(
      { isSocialSecurityNumberValid: !isStrEmpty },
      () => {
        if (!isStrEmpty) {
          dispatch(setData('SET_SOCIAL_SECURITY_NUMBER', str));
        }
      },
    );
  }

  handleDateOfBirthValidation(str) {
    const { dispatch } = this.props;
    const isStrEmpty = validator.isEmpty(str);
    this.setState(
      { isDateOfBirthValid: !isStrEmpty },
      () => {
        if (!isStrEmpty) {
          dispatch(setData('SET_DATE_OF_BIRTH', str));
        }
      },
    );
  }

  // handleLastNameValidation(str) {
  //   const { dispatch } = this.props;
  //   const isStrEmpty = validator.isEmpty(str);
  //   this.setState(
  //     { isLastNameValid: !isStrEmpty },
  //     () => {
  //       if (!isStrEmpty) {
  //         dispatch(setData('SET_LAST_NAME', str));
  //       }
  //     },
  //   );
  // }

  // handleMobilePhoneValidation(str) {
  //   const { dispatch } = this.props;
  //   const validate = validator.matches(str, /^\d{3}-?\d{3}-?\d{4}$/);
  //   this.setState(
  //     { isMobilePhoneValid: validate },
  //     () => dispatch(setData('SET_MOBILE_PHONE_NUMBER', str)),
  //   );
  // }

  handleFormValidation(state) {
    const {
      socialSecurityNumber,
      dateOfBirth,
    } = state;

    const socialSecurityNumberValid = socialSecurityNumber && socialSecurityNumber.length > 0;
    const DateOfBirthValid = dateOfBirth && dateOfBirth.length > 0;

    this.setState({
      isFormValid: (
        socialSecurityNumberValid && DateOfBirthValid
      ),
    });
  }

  render() {
    const { componentProps, ContactInformationState } = this.props;
    const {
      socialSecurityNumber,
      dateOfBirth,
    } = ContactInformationState;

    const {
      isFormValid,
      isSocialSecurityNumberValid,
      isDateOfBirthValid,

    } = this.state;

    return (
      <StyledContactInformation>
        <PageHeader pageTitle={componentProps.pageTitle} headerIcon={PersonalAvatar} />
        <StyledContentWrapper>
          <p className='content-subheading'>We need this information to verify your identity and eligibilty for a new account.
          </p>
          <StyledFormWrapper>
            <p className='instructional-text'> All fields are required unless noted otherwise. </p>
            <InputField
              label='Social Security Number'
              inputType='text'
              onChangeMethod={this.handleSocialSecurityNumberValidation}
              initialValue={socialSecurityNumber}
              errorMessage={!isSocialSecurityNumberValid ? requiredFieldErrorMessage : null}
            />
            <InputField
              label='Date of Birth'
              inputType='text'
              onChangeMethod={this.handleDateOfBirthValidation}
              initialValue={dateOfBirth}
              errorMessage={!isDateOfBirthValid ? requiredFieldErrorMessage : null}
              isOptional
              hasChinstrap
              chinstrapMessage={DateOfBirthFormat}
            />
            {/* <SelectField
              label='Primary Phone Number'
              inputType='tel'
              onChangeMethod={this.handlePrimaryPhoneValidation}
              initialValue={primaryPhoneNumber}
              isOptional={false}
              errorMessage={!isPrimaryPhoneValid ? invalidPhoneErrorMessage : null}
            /> */}
          </StyledFormWrapper>
          <WizardFooterNav nextPath='/personal-information' isDisabled={!isFormValid} />
        </StyledContentWrapper>
      </StyledContactInformation>
    );
  }
}

PersonalInformation.propTypes = {
  componentProps: PropTypes.shape({
    pageTitle: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  ContactInformationState: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobilePhoneNumber: PropTypes.string,
    primaryPhoneNumber: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  ContactInformationState: state.ContactInformationState,
});

export default connect(mapStateToProps, null)(PersonalInformation);
