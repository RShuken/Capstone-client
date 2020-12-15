import React from 'react';
import { shallow } from 'enzyme';
import Connect from '../components/Connect';
import RenderWithRouter from '../test/testHelper'

it('Connect component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <Connect/>
    </RenderWithRouter>
  );
});

