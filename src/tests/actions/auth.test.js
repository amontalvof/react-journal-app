import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {
    login,
    logout,
    startLoginEmailPassword,
    startLogout,
} from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Tests with auth actions', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('should login and logout create the respective action', () => {
        const uid = 'abc123';
        const displayName = 'Andy';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: { uid, displayName },
        });

        expect(logoutAction).toEqual({ type: types.logout });
    });

    test('should do the startLogout', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: types.logout });
        expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
    });

    test('should do the startLoginEmailPassword', async () => {
        await store.dispatch(
            startLoginEmailPassword('react-journal-app@testing.com', '123456')
        );
        const actions = store.getActions();
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'XEov6LCD2igQnrFK9XEEUT4lYTv2',
                displayName: null,
            },
        });
    });
});
