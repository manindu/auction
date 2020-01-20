import React from 'react';
import { shallow } from 'enzyme';
import Button from '../src/components/Button';

describe('SomeComponent component', () => {
  it('Shallow rendering', () => {
    const wrapper = shallow(<Button label="Save" onClick={() => {}} />);
  });
});
