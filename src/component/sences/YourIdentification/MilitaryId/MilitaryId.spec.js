/* global shallow */
import React from 'react';
import configureStore from 'redux-mock-store';
import MilitaryId from './MilitaryId';

const initialStoreState = {
  YourIdentificationState: {
    militaryBranch: '',
    militaryIdentificationNumber: '',
    militaryExpirationDate: '',
  },
};

const mockStore = configureStore();
let wrapper;
let store;

describe('<MilitaryId>', () => {
  beforeEach(() => {
    store = mockStore(initialStoreState);
    wrapper = shallow(
      <MilitaryId
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