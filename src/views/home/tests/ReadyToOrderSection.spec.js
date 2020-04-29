import React from 'react';
import ReadyToOrderSection from 'src/components/ReadyToOrderSection';

describe('Ready to order section component', () => {
  const wrrapper = shallow(<ReadyToOrderSection />);

  it('renders properly', () => {
    expect(wrrapper).toMatchSnapshot();
  });
});
