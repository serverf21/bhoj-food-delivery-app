import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// connection with backend
const client = sanityClient({
    projectId: "xz1q44vr",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
})
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;