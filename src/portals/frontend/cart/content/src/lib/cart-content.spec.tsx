import { render } from '@testing-library/react';

import CartContent from './cart-content';

describe('CartContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartContent />);
    expect(baseElement).toBeTruthy();
  });
});
