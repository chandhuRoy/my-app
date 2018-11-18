/* global shallow */
import React from 'react';
import configureStore from 'redux-mock-store';
import YourIdentification from './YourIdentification';

const initialStoreState = {
  YourIdentificationState: {
    idType: '',
  },
};

const mockStore = configureStore();
let wrapper;
let store;

const componentProps = {
  pageTitle: 'Your Identification',
};

describe('<YourIdentification>', () => {
  beforeEach(() => {
    store = mockStore(initialStoreState);
    wrapper = shallow(
      <YourIdentification
        store={store}
        componentProps={componentProps}
        YourIdentificationState={store.YourIdentificationState}
      />,
    );
  });
  it('should render snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
