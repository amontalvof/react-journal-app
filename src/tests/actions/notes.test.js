import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {
    // startLoadingNotes,
    startNewNote,
    startSaveNote,
    startUploading,
} from '../../actions/notes';
import { dataBase } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';
// eslint-disable-next-line no-unused-vars
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: () => {
        return 'https://hello-world.com/thing.jpg';
        // return Promise.resolve('https://hello-world.com/thing.jpg');
    },
}));

// this solve an error in the test "should update the url of entry startUploading"
global.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'testing-react-journal-app',
    },
    notes: {
        active: {
            id: 'IafSKiOaOnlCzaBSESWB',
            title: 'Hello',
            body: 'World',
        },
    },
};

let store = mockStore(initState);

describe('Tests with notes actions', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('should create a new note startNewNote', async () => {
        await store.dispatch(startNewNote());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        });
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        });

        // delete testing notes
        const docId = actions[0].payload.id;
        await dataBase
            .doc(`/testing-react-journal-app/journal/notes/${docId}`)
            .delete();
    });

    // test('should load the notes startLoadingNotes', async () => {
    //     await store.dispatch(startLoadingNotes('testing-react-journal-app'));
    //     const actions = store.getActions();
    //     expect(actions[0]).toEqual({
    //         type: types.notesLoad,
    //         payload: expect.any(Array),
    //     });

    //     const expected = {
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         body: expect.any(String),
    //         date: expect.any(Number),
    //     };

    //     expect(actions[0].payload[0]).toMatchObject(expected);
    // });

    test('should update the note startSaveNote', async () => {
        const note = {
            id: '9nPEObk7GoKVtaDEeDHZ',
            title: 'my title',
            body: 'my body',
        };
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);
        // const docRef = await dataBase
        //     .doc(`/testing-react-journal-app/journal/notes/${note.id}`)
        //     .get();
        // expect(docRef.data().title).toBe(note.title);
    });

    test('should update the url of entry startUploading', async () => {
        const file = new File([], 'picture.jpg');
        await store.dispatch(startUploading(file));
        // const docRef = await dataBase
        //     .doc(
        //         '/testing-react-journal-app/journal/notes/IafSKiOaOnlCzaBSESWB'
        //     )
        //     .get();
        // expect(docRef.data().url).toBe('https://hello-world.com/thing.jpg');
    });
});
