import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { colors, typography, breakpoints } from '../../styles/rds-theme';
import PageHeader from '../../components/PageHeader/PageHeader';
import IdIcon from '../../components/IdIcon/IdIcon';
import SelectField from '../../components/SelectField/SelectField';
import setData from '../../redux/actions/SetAction/SetAction';
import MilitaryId from './MilitaryId/MilitaryId';
import WizardFooterNav from '../../components/WizardFooterNav/WizardFooterNav';
import * as selectHashes from '../../models/SelectOptionsHashes.json';
import checkInvalidRefs from '../../lib/checkInvalidRefs/checkInvalidRefs';

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
    color: ${colors.darkGrey};
    margin-bottom: 1rem;
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
    color: ${colors.mediumDarkGrey};
    margin-bottom: 1rem;
  }
`;

class YourIdentification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goBack: false,
      goForward: false,
      isFormValid: true,
      validating: false,
    };
    this.refArray = [];
    this.handleInvalidRef = this.handleInvalidRef.bind(this);
    this.handleDispatch = this.handleDispatch.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleForward = this.handleForward.bind(this);
  }

  handleFormValidation = () => {
    const filteredRefArray = checkInvalidRefs(this.refArray);

    if (filteredRefArray.length) {
      setTimeout(() => {
        filteredRefArray[0].focus();
      }, 0);
    }

    this.setState({
      validating: true,
      isFormValid: filteredRefArray.length < 1,
    },
    () => setTimeout(() => {
      const { isFormValid } = this.state;
      if (isFormValid) {
        this.handleForward();
      }
    }, 0));
  }

  handleDispatch(str, action) {
    const { dispatch } = this.props;
    dispatch(setData(action, str));
  }

  handleInvalidRef(ref) {
    this.refArray.push(ref);
    this.handleFormValidation();
  }

  handleForward() {
    this.setState({ goForward: true });
  }

  handleBack() {
    this.setState({ goBack: true });
  }

  render() {
    const { componentProps, YourIdentificationState } = this.props;
    const {
      idType,
    } = YourIdentificationState;

    const {
      goBack,
      goForward,
      validating,
    } = this.state;

    if (goBack) {
      return <Redirect push to='/personal-information' />;
    }

    if (goForward) {
      return <Redirect push to='/congratulations' />;
    }

    const getOptions = hash => Object.entries(hash).map(item => ({ key: item[0], value: item[1] }));

    return (
      <StyledContactInformation>
        <PageHeader pageTitle={componentProps.pageTitle} headerIcon={IdIcon} />
        <StyledContentWrapper>
          <p className='content-subheading'>Enter the information found on your Driver&apos;s License,
            Passport, State-Issued ID or Military ID.
          </p>
          <StyledFormWrapper>
            <p className='content-subheading'>All fields are required unless noted otherwise.
            </p>
            <SelectField
              label='Type of Identification'
              onChangeMethod={str => this.handleDispatch(str, 'SET_ID_TYPE')}
              isValidating={validating}
              invalidRef={this.handleInvalidRef}
              initialValue={idType}
              options={getOptions(selectHashes.default.identificationType)}
            />
            <MilitaryId
              invalidRef={this.handleInvalidRef}
              isValidating={validating}
            />
          </StyledFormWrapper>
          <WizardFooterNav
            handleNext={() => this.handleFormValidation()}
            handleBack={() => this.handleBack()}
          />
        </StyledContentWrapper>
      </StyledContactInformation>
    );
  }
}

YourIdentification.propTypes = {
  componentProps: PropTypes.shape({
    pageTitle: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  YourIdentificationState: PropTypes.shape({
  }).isRequired,
};

const mapStateToProps = state => ({
  YourIdentificationState: state.YourIdentificationState,
});

export default connect(mapStateToProps, null)(YourIdentification);