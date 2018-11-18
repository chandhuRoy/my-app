const initialState = {
  socialSecuirtyNumber: '',
  dateOfBirth: '',
};

const PersonalInformationState = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'SET_SOCIAL_SECURITY_NUMBER': return { ...state, socialSecuirtyNumber: data };
    case 'SET_DATE_OF_BIRTH': return { ...state, dateOfBirth: data };
    default: return state;
  }
};

export default PersonalInformationState;