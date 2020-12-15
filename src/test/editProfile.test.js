import React from 'react';
import { shallow } from 'enzyme';
import EditProfile from '../components/Profile/EditProfile';
import RenderWithRouter from '../test/testHelper';

it('Private route component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <EditProfile />
    </RenderWithRouter>
  );
});
