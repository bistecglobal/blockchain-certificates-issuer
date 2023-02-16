import { render } from '@testing-library/react';

import CartPageTrainers from './cart-page-trainers';

describe('CartPageTrainers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageTrainers />);
    expect(baseElement).toBeTruthy();
  });
});
