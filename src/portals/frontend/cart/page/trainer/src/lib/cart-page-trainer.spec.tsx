import { render } from '@testing-library/react';

import CartPageTrainer from './cart-page-trainer';

describe('CartPageTrainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageTrainer />);
    expect(baseElement).toBeTruthy();
  });
});
