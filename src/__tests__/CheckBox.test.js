import React from 'react';
import renderer from 'react-test-renderer';
import CheckBox from '../CheckBox';

it('renders correctly when unchecked', () => {
    const tree = renderer.create(
        <CheckBox title={'Some value'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly when checked', () => {
    const component = renderer.create(
        <CheckBox title={'Some value'}
                  checked={true}
                  checkboxColor="red"
                  onCheckedChange={(state) => {
                  }}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
