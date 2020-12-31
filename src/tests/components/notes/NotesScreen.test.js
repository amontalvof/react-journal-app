import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
            title: 'Hello',
            body: 'World',
            date: 1609435802903,
        },
        notes: [],
    },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
);

describe('Tests in <NotesScreen />', () => {
    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call the activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello again',
            },
        });
        expect(activeNote).toHaveBeenLastCalledWith('abc', {
            id: 'abc',
            title: 'Hello again',
            body: 'World',
            date: 1609435802903,
        });
    });
});
