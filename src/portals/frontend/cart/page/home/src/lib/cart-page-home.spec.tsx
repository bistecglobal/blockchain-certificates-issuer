import { render } from '@testing-library/react';

import CartPageHome from './cart-page-home';

describe('CartPageHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageHome />);
    expect(baseElement).toBeTruthy();
  });
});
