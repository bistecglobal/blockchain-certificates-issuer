import { render } from '@testing-library/react';

import Courses from './courses';

describe('Courses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Courses />);
    expect(baseElement).toBeTruthy();
  });
});
