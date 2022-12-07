export default interface Token {
    sub: string;
    iss: string;
    aud: string;
    uuid: string;
    iat: number;
    exp: number;
}
