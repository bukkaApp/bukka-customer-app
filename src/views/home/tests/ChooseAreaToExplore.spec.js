import React from 'react';

import ChooseAreaToExploreSection
  from 'src/components/ChooseAreaToExploreSection';

describe('Area to explore component', () => {
  const wrapper = shallow(<ChooseAreaToExploreSection />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
