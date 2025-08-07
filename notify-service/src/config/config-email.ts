import * as nodemailer from 'nodemailer';

export const configEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'peter.study666@gmail.com',
        pass: 'xudy kvxb twaq shgj',
    },
});
