import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Main from './index';

test('Should not throw on epmty value', () => {
    const { container } = render(<Main />);
    const input = container.querySelector('input');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
        target: { value: "new value" }
    });

    fireEvent.change(input, {
        target: { value: "" }
    });
});
