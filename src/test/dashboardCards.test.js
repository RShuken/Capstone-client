import React from 'react';
import { shallow } from 'enzyme';
import DashboardCards from '../components/DashboardCards';
import RenderWithRouter from '../test/testHelper';

it('Dashboard card component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <DashboardCards />
    </RenderWithRouter>
  );
});
