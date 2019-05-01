import request from 'request-promise-native';

export default async function fetch_retry(options, n) {
    return await request(options)
        .then(response => {
            return JSON.parse(response);
        })
        .catch(async (err) => {
            if (n === 1) throw err;
            return await fetch_retry(options, n - 1);
        });
}

