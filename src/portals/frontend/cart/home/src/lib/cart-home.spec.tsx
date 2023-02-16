import { render } from '@testing-library/react';

import CartHome from './cart-home';

describe('CartHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartHome />);
    expect(baseElement).toBeTruthy();
  });
});
