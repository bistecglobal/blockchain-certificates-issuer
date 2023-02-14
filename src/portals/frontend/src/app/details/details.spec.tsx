import { render } from '@testing-library/react';

import Details from './details';

describe('Details', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Details />);
    expect(baseElement).toBeTruthy();
  });
});
