interface IEmailService {
    sendEmail(to: string, subject: string, body: string): void;
}

interface ISMSService {
    sendSMS(to: string, message: string): void;
}

interface IPushNotificationService {
    sendPushNotification(to: string, message: string): void;
}

interface IMessageFactory {
    createMessageService(type: string): IEmailService | ISMSService | IPushNotificationService;
}

export type { IEmailService, ISMSService, IPushNotificationService, IMessageFactory };