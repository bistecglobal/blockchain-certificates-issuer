import { render } from '@testing-library/react';

import CartPageCourse from './cart-page-course';

describe('CartPageCourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageCourse />);
    expect(baseElement).toBeTruthy();
  });
});
