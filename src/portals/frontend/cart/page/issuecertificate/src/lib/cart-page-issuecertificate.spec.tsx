import { render } from '@testing-library/react';

import CartPageIssuecertificate from './cart-page-issuecertificate';

describe('CartPageIssuecertificate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartPageIssuecertificate />);
    expect(baseElement).toBeTruthy();
  });
});
