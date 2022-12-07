export default interface Response<TResultData> {
    statusCode: number;
    responseData: TResultData;
}
