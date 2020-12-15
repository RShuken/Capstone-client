import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';
import RenderWithRouter from './testHelper';

it('Header component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <Header />
    </RenderWithRouter>
  );
});
