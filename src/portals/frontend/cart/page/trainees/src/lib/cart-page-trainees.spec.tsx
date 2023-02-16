import { render } from '@testing-library/react';

import CartPageTrainees from './cart-page-trainees';

describe('CartPageTrainees', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageTrainees />);
    expect(baseElement).toBeTruthy();
  });
});
