import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: '10',
    date: 1609435802903,
    title: 'Hello',
    body: 'World',
    url: 'https://someplace.com/picture.jpg',
};

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note} />
    </Provider>
);

describe('Tests in <JournalEntry />', () => {
    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should activate the note', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, { ...note })
        );
    });
});
