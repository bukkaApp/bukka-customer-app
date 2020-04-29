import React from 'react';
import AuthForm from 'src/components/AuthForm';
import Data from './__mocks__/register';


describe('Auth Form component', () => {
  const props = {
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    inputData: Data,
    isFormCompleted: false,
    type: 'signin',
    domStructure: Data.domStructureMock
  };
  const wrapper = shallow(<AuthForm {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('traverse the form component', () => {
    expect(wrapper.find('form').first()).toBeTruthy();
    expect(wrapper.find('.divider-box')).toBeTruthy();
  });
});
