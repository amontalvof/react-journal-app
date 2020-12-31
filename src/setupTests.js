import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
import { Swal } from 'sweetalert2';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// this solve an error in the test "should update the url of entry startUploading"
// const noScroll = () => {};
// Object.defineProperty(window, 'scrollTo', { value: noScroll, writable: true });

// this solve the warning UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'querySelector' of null
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    close: jest.fn(),
}));
