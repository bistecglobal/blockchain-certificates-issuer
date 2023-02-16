import { render } from '@testing-library/react';

import CartPageTrainee from './cart-page-trainee';

describe('CartPageTrainee', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageTrainee />);
    expect(baseElement).toBeTruthy();
  });
});
