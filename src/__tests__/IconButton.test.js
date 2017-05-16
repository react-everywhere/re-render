import React from 'react';
import renderer from 'react-test-renderer';
import IconButton from '../IconButton/index';

it('renders correctly without onPress', () => {
    const tree = renderer.create(
        <IconButton name={'bath'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with onPress', () => {
    const tree = renderer.create(
        <IconButton name={'bath'} onPress={() => {
        }}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
