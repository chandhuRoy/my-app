import React from 'react';
import './App.css';
import SelectField from './component/Select/Select';
import InputField from './component/Input/InputField';

const App = () => (
  <div style={{ margin: 20 }}>
    <SelectField
      label='Employement Status'
      defaultValue=''
      errorMessage=''
      options={[{ key: 1, value: 'Full Time' }, { key: 2, value: 'Part Time' }]}
    />
    <InputField
      label='Email'
      inputType='email'
      initialValue=''
      errorMessage=''
    />
  </div>
);

export default App;
