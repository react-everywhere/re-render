import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from '../Dropdown/index';

it('renders correctly', () => {
    const tree = renderer.create(
        <Dropdown list={[{key: 1, value: 'Apple'}, {key: 2, value: 'Mango'}]}
                  placeholder={'Choose a fruit'}
                  listHeight={100}
                  placeholderColor={'red'}
                  placeholderBackground={'blue'}
                  itemStyle={{backgroundColor: 'red'}}
                  onItemSelected={(item) => {
                  }}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
