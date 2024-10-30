import * as React from 'react';
import renderer from 'react-test-renderer';

import LQDButton from '../button';

it(`button renders correctly`, () => {
  const tree = renderer.create(<LQDButton title="Hello" />).toJSON();
  expect(tree).toMatchSnapshot();
});
