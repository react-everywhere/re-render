import React from 'react';
import renderer from 'react-test-renderer';
import RadioGroup from '../Radio/RadioGroup';
import RadioButton from '../Radio/RadioButton';

it('renders correctly', () => {
    const tree = renderer.create(
        <RadioGroup title="Select gender" onSelectionChange={()=>{}}>
            <RadioButton id={1} title="male" checked={false} color={'red'}/>
            <RadioButton id={2} title="female" checked={false} color={'red'}/>
        </RadioGroup>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
