import React from 'react';
import renderer from 'react-test-renderer';
import TextInputWeb from '../TextInput/index';
import TextInputAndroid from '../TextInput/index.android';
import TextInputIos from '../TextInput/index.ios';

it('renders on web correctly', () => {
    const tree = renderer.create(
        <TextInputWeb placeholder={'Enter Name'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders on android correctly', () => {
    const tree = renderer.create(
        <TextInputAndroid placeholder={'Enter Name'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders on ios correctly', () => {
    const tree = renderer.create(
        <TextInputIos placeholder={'Enter Name'}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});