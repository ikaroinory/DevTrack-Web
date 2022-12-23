export default interface NotificationDTO {
    uuid: string;
    type: number;
    time: string;
    title: string;
    context: string;
    paramUUID: string;
    handlingTime: string | null;
}
