import React from 'react';

import DiscoverSection
  from 'src/components/DiscoverSection';

describe('Area to explore component', () => {
  const wrapper = shallow(<DiscoverSection />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
