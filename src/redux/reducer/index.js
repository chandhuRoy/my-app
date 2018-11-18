import { combineReducers } from 'redux';
import GettingStarted from './GettingStartedReducer';
import ContactInformationState from './ContactInformationReducer';
import PersonalInformationState from './PersonalInformationReducer';

export default combineReducers({
  GettingStarted,
  ContactInformationState,
  PersonalInformationState,
});