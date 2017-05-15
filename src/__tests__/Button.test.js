import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button/index';

it('renders correctly', () => {
    const tree = renderer.create(
        <Button title={'Click me'} onPress={() => {
        }}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
