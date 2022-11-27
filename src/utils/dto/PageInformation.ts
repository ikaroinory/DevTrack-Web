export default interface PageInformation<TData> {
    current: number;
    size: number;
    recordCount: number;
    pageCount: number;
    list: Array<TData>;
}
