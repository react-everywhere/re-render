import React from 'react';
import renderer from 'react-test-renderer';
import Label from '../Label/index';

it('renders correctly', () => {
    const tree = renderer.create(
        <Label value={'Some text'} style={{fontSize:20}}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
