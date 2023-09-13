import crypto from 'crypto';

const AUTH_SECRET = 'REST-API';

export const randomString = () => crypto.randomBytes(128).toString('base64');

export const authenticationPassword = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(AUTH_SECRET).digest('hex');
}