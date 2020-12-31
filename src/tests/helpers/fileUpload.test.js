import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

describe('Tests in fileUpload', () => {
    test('should load a file and return the url', async () => {
        const resp = await fetch(
            'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
        );
        const blob = await resp.blob();

        const file = new File([blob], 'homer.jpg');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Delete image for id
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        await cloudinary.v2.api.delete_resources(imageId, {}, () => {});
    });

    test('should return an error', async () => {
        const file = new File([], 'homer.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});
