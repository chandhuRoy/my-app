/* global mount */
import React from 'react';
import configureStore from 'redux-mock-store';
import StateIssuedId from './StateIssuedId';
import InputField from '../../../components/InputField/InputField';
import SelectField from '../../../components/SelectField/SelectField';

const initialStoreState = {
  YourIdentificationState: {
    driversLicenseNumber: '',
    driversLicenseIssueDate: '',
    driversLicenseExpirationDate: '',
    driversLicenseStateIssued: '',
  },
};

const mockStore = configureStore();
let wrapper;
let store;

describe('<StateIssuedId>', () => {
  beforeEach(() => {
    store = mockStore(initialStoreState);
    wrapper = mount(
      <StateIssuedId
        store={store}
        isValidating={false}
        invalidRef={jest.fn()}
        YourIdentificationState={store.YourIdentificationState}
      />,
    );
  });

  it('should render snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain 3 InputFields', () => {
    expect(wrapper.find(InputField).length).toBe(3);
  });

  it('should contain 2 SelectFields', () => {
    expect(wrapper.find(SelectField).length).toBe(1);
  });
});