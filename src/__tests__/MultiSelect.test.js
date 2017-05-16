import React from 'react';
import renderer from 'react-test-renderer';
import MultiSelect, { MultiSelectItem } from '../MultiSelect/index';

it('renders correctly', () => {
    const tree = renderer.create(
        <MultiSelect title="Pick fruits" onSelectionChange={(selectionArray) => {
        }}>
            <MultiSelectItem id={1} title="Apple" selected={false}/>
            <MultiSelectItem id={2} title="Mango" selected={true}/>
            <MultiSelectItem id={3} title="Guava" selected={false}/>
        </MultiSelect>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
