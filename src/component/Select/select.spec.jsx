import React from 'react';
import { shallow } from 'enzyme';
import SelectField from './SelectField';
import * as options from '../../models/SelectOptionsHashes.json';

const getOptionsFromHash = () => Object.entries(options.employmentStatus)
  .map(item => ({ key: item[0], value: item[1] }));

const mockChangeFn = jest.fn();
const mockRefFn = jest.fn();
const selectInput = shallow(
  <SelectField
    label='Employment Status'
    onChangeMethod={mockChangeFn}
    isValidating={false}
    invalidRef={mockRefFn}
    initialValue=''
    options={getOptionsFromHash()}
  />,
);

xdescribe('<SelectField>', () => {
  it('should render', () => {
    expect(selectInput).toMatchSnapshot();
  });
  it('should contain a <select> element', () => {
    const element = selectInput.find('Styled(select)');
    expect(element).toHaveLength(1);
  });
  it('should contain a <label> element', () => {
    const element = selectInput.find('Styled(label)');
    expect(element).toHaveLength(1);
  });
  it('should contain at least one <option> element', () => {
    const element = selectInput.find('Styled(option)');
    expect(element.length).toBeGreaterThan(1);
  });
  it('should fire off an onChange event on selecting an option', () => {
    selectInput.find('Styled(select)').simulate('change', { target: { value: 'Architecture and Engineering' } });

    expect(mockChangeFn).toHaveBeenCalled();
    expect(selectInput.find('Styled(select)').props().value).toEqual('Architecture and Engineering');
  });
});
