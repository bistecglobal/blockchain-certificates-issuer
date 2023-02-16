import { render } from '@testing-library/react';

import CartHeader from './cart-header';

describe('CartHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartHeader />);
    expect(baseElement).toBeTruthy();
  });
});
