
//inputfield.spec.js//




import React from 'react';
import { mount } from 'enzyme';
import InputField from './InputField';

const mockChangeFn = jest.fn();
const mockInvalidRefFn = jest.fn();

const textInput = mount(
  <InputField
    label='Full Name'
    inputType='text'
    isValidating={false}
    onChangeMethod={mockChangeFn}
    invalidRef={mockInvalidRefFn}
  />,
);

const phoneInput = mount(
  <InputField
    label='Phone number'
    inputType='tel'
    isValidating={false}
    onChangeMethod={mockChangeFn}
    invalidRef={mockInvalidRefFn}
  />,
);

describe('<InputField>', () => {
  it('should render', () => {
    // console.log('textInput', textInput.debug());
    expect(textInput).toMatchSnapshot();
  });
  it('should contain all required props', () => {
    const props = textInput.props();

    expect(props.label).toBeDefined();
    expect(props.inputType).toBeDefined();
    expect(props.isValidating).toBeDefined();
    expect(props.onChangeMethod).toBeDefined();
    expect(props.invalidRef).toBeDefined();
  });
  it('should contain an <input> element', () => {
    expect(textInput.find('input')).toHaveLength(1);
  });
  it('should have a type defined on the <input>', () => {
    const input = textInput.find('input').props();
    expect(input.type).toEqual('text');
  });
  it('should change the type based on props', () => {
    const input = phoneInput.find('input').props();
    expect(input.type).toEqual('tel');
  });
  it('should fire off an onChange event on entering text and set value', () => {
    textInput.find('input').simulate('change', { target: { value: 'Martin' } });
    expect(mockChangeFn).toHaveBeenCalled();
    expect(textInput.find('input').props().value).toEqual('Martin');
  });
  it('should have label for match the id of input', () => {
    const inputId = textInput.find('input').props().id;
    const labelFor = textInput.find('label').props().htmlFor;
    expect(labelFor).toMatch(inputId);
  });
  it('should display error state if error', () => {
    textInput.setState({
      isValid: false,
      errorMessages: ['This field is required.'],
    });
    const errorMark = textInput.find('.error-icon-mark');
    const errorMessage = textInput.find('p#error_message_full_name_0').getElement();
    expect(errorMark.text()).toContain('!');
    expect(errorMessage.props.children).toEqual('This field is required.');
  });
});
