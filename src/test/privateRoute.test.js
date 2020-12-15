import React from 'react';
import { shallow } from 'enzyme';
import PrivateRoute from '../components/PrivateRoute';
import RenderWithRouter from '../test/testHelper';

it('Private route component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <PrivateRoute />
    </RenderWithRouter>
  );
});
