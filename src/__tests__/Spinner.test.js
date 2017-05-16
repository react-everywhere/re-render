import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from '../Spinner/index';

it('renders correctly', () => {
    const tree = renderer.create(
        <Spinner color={'red'} size={20}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
