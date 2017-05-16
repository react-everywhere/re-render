import React from 'react';
import renderer from 'react-test-renderer';
import AutoComplete from '../AutoComplete';

it('renders correctly', () => {
    const tree = renderer.create(
        <AutoComplete list={['Apple', 'Mango']}
                      ignoreCase={true}
                      onItemSelected={(item) => {
                      }}
                      placeholder={'Search fruit'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
