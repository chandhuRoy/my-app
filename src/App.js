import React from 'react';
import './App.css';
import SelectField from './component/InputField';

const App = () => (
  <SelectField
    label='Email'
    inputType='email'
    initialValue=''
    errorMessage=''
  />
);

export default App;
