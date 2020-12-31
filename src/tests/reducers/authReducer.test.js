import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Tests in authReducer', () => {
    test('should login', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'qwe',
                displayName: 'Andy',
            },
        };
        const state = authReducer(initState, action);
        expect(state).toEqual({
            uid: 'qwe',
            name: 'Andy',
        });
    });

    test('should logout', () => {
        const initState = {
            uid: 'qwe',
            displayName: 'Andy',
        };
        const action = {
            type: types.logout,
        };
        const state = authReducer(initState, action);
        expect(state).toEqual({});
    });

    test('should return initState', () => {
        const initState = {
            uid: 'qwe',
            displayName: 'Andy',
        };
        const action = {
            type: 'sdgsafah',
        };
        const state = authReducer(initState, action);
        expect(state).toEqual(initState);
    });
});
