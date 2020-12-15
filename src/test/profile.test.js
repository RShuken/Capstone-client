import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../components/Profile';
import RenderWithRouter from '../test/testHelper';

it('Private route component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <Profile />
    </RenderWithRouter>
  );
});
