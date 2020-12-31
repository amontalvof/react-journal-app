import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
};

let store = mockStore(initState);

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Tests in <RegisterScreen />', () => {
    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should do the dispatch of the respective action', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {},
        });
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Name is required!',
        });
    });

    test('should show the alert box with the error', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Invalid Email!',
            },
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
            'Invalid Email!'
        );
    });
});
