import React from 'react'

import { render } from '@testing-library/react';

import BubleChart from './bubble-chart';
import { MostCommon } from '../utils/back-end-calls';

test('Should remove previous data on re-render', () => {
    let data: MostCommon[] = [
        ['word', 50],
        ['sentence', 40],
        ['sentence', 40]
    ];
    const { container, rerender } = render(<BubleChart data={data}/>);

    expect(container.querySelectorAll('circle').length).toEqual(3);

    data = [
        ['bob', 40],
        ['alice', 40],
        ['42', 40],
        ['Gendalf', 40],
        ['Frodo', 40]
    ]

    rerender(<BubleChart data={data}/>);

    expect(container.querySelectorAll('circle').length).toEqual(5);
});
