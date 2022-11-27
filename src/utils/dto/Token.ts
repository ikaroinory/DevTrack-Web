export default interface Token {
    sub: string;
    iss: string;
    aud: string;
    iat: number;
    exp: number;
}
