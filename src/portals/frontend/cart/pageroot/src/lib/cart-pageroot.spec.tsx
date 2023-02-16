import { render } from '@testing-library/react';

import CartPageroot from './cart-pageroot';

describe('CartPageroot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageroot />);
    expect(baseElement).toBeTruthy();
  });
});
