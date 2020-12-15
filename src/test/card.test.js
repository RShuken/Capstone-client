import React from 'react';
import { shallow } from 'enzyme';
import Card from '../components/DashboardCards/Card';
import RenderWithRouter from './testHelper';

it('Card component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <Card />
    </RenderWithRouter>
  );
});
