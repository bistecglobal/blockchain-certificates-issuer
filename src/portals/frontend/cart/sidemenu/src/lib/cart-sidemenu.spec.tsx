import { render } from '@testing-library/react';

import CartSidemenu from './cart-sidemenu';

describe('CartSidemenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartSidemenu />);
    expect(baseElement).toBeTruthy();
  });
});
