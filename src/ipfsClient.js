import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer'; // Import the Buffer polyfill

// Configure the Buffer globally for the application
window.Buffer = window.Buffer || Buffer;

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: 'Basic ' + Buffer.from('7f8de12ec01a491295383f01bb42232f:TMW0cBaV6jrKjafVbtSard5UMQ+m5kWBdYIWn6g0rfQnAEFU7Qv7gQ').toString('base64'),
    },
});

export default ipfs;