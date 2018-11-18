/* global mount */
import React from 'react';
import InputField from './InputField';

const mockChangeFn = jest.fn();
const mockInvalidRefFn = jest.fn();

let textInput;
let phoneInput;

describe('<InputField> Text input', () => {
  beforeEach(() => {
    textInput = mount(
      <InputField
        label='Full Name'
        inputType='text'
        isValidating={false}
        onChangeMethod={mockChangeFn}
        invalidRef={mockInvalidRefFn}
      />,
    );
  });

  it('should render', () => {
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
    expect(textInput.find('input').exists()).toBe(true);
  });

  it('should have a type defined on the <input>', () => {
    const inputProps = textInput.find('input').props();
    expect(inputProps.type).toEqual('text');
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
    const errorProps = textInput.find('p').props();

    expect(errorProps.children).toEqual('This field is required.');
  });

  describe('<InputField> Phone input', () => {
    beforeEach(() => {
      phoneInput = mount(
        <InputField
          label='Phone number'
          inputType='tel'
          isValidating={false}
          onChangeMethod={mockChangeFn}
          invalidRef={mockInvalidRefFn}
        />,
      );
    });

    it('should change the type based on props', () => {
      const inputProps = phoneInput.find('input').props();
      expect(inputProps.type).toEqual('tel');
    });
  });
});
 