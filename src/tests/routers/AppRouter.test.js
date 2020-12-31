import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { firebase } from '../../firebase/firebaseConfig';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
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

describe('Tests in <AppRouter />', () => {
    test('should call the login if I am authenticated', async () => {
        let user;
        await act(async () => {
            const userCred = await firebase
                .auth()
                .signInWithEmailAndPassword(
                    'react-journal-app@testing.com',
                    '123456'
                );
            user = userCred.user;
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });
        expect(login).toHaveBeenCalledWith(
            'XEov6LCD2igQnrFK9XEEUT4lYTv2',
            null
        );
    });
});
