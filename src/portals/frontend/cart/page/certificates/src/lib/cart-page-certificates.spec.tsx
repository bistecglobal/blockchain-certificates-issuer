import { render } from '@testing-library/react';

import CartPageCertificates from './cart-page-certificates';

describe('CartPageCertificates', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageCertificates />);
    expect(baseElement).toBeTruthy();
  });
});
