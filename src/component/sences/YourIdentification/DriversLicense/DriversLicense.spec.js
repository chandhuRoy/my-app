/* global mount */
import React from 'react';
import configureStore from 'redux-mock-store';
import DriversLicense from './DriversLicense';

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

describe('<DriversLicense>', () => {
  beforeEach(() => {
    store = mockStore(initialStoreState);
    wrapper = mount(
      <DriversLicense
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
});