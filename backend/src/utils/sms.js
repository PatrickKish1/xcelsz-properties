import fetch from 'node-fetch';

export async function sendSms(receiver, msg) {
    const query = new URLSearchParams({
        clientid: 'iyavwwks',
        clientsecret: 'dbpiazzg',
        from: 'LTest',
        to: receiver,
        content: msg,
    }).toString();

    const resp = await fetch(
        `https://smsc.hubtel.com/v1/messages/send?${query}`,
        { method: 'GET' }
    );

    const data = await resp.text();
    console.log(data);
}
