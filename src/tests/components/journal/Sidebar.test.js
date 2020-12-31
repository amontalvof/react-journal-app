import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Andy',
    },
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: {
            id: 'abc',
        },
        notes: [],
    },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Sidebar />
    </Provider>
);

describe('Tests in <Sidebar />', () => {
    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call the startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('should call the startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    });
});
