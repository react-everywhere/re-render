import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../TextArea/index';

it('renders correctly', () => {
    const tree = renderer.create(
        <TextArea placeholder={'Enter Address'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
