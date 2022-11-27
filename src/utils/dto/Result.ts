export default interface Result<TResultData> {
    statusCode: number;
    resultData: TResultData;
}
