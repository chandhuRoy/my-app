import React from 'react';
import { mount } from 'enzyme';
import SelectField from './Select';

const mockChangeFn = jest.fn();
const mockInvalidRefFn = jest.fn();

const selectInput = mount(
  <SelectField
    label='Employement Status'
      defaultValue='Full Time'
      errorMessage=''
      options={[{ key: 1, value: 'Full Time' }, { key: 1, value: 'Part Time' }]}
    />,
);

describe('<SelectField>', () => {
  it('should render', () => {
    // console.log('selectInput', selectInput.debug());
    expect(selectInput).toMatchSnapshot();
  });
  it('should contain all required props', () => {
    const props = selectInput.props();

    expect(props.label).toBeDefined();
  });
  it('should contain an <select> element', () => {
    expect(selectInput.find('select')).toHaveLength(1);
  });
  it('should fire off an onChange event on entering text and set value', () => {
    selectInput.find('select').simulate('change', { target: { value: 'Martin' } });
    expect(mockChangeFn).toHaveBeenCalled();
    expect(selectInput.find('select').props().value).toEqual('Martin');
  });
  it('should have label for match the id of input', () => {
    const selectId = selectInput.find('select').props().id;
    const labelFor = selectInput.find('label').props().htmlFor;
    expect(labelFor).toMatch(selectId);
  });
});
