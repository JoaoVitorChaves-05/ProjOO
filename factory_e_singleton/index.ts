import { IEmailService, ISMSService, IPushNotificationService, IMessageFactory } from "./interfaces";

class EmailService implements IEmailService {
    sendEmail(to: string, subject: string, body: string): void {
        console.log(`Sending email to ${to} with subject "${subject}" and body "${body}"`);
    }
}

class SMSService implements ISMSService {
    sendSMS(to: string, message: string): void {
        console.log(`Sending SMS to ${to} with message "${message}"`);
    }
}

class PushNotificationService implements IPushNotificationService {
    sendPushNotification(to: string, message: string): void {
        console.log(`Sending Pushnotification to ${to} with message "${message}"`);
    }
}

class GlobalSingleton {
    private static instance : GlobalSingleton;

    public appName: string = "Message System";
    public serverUrl: string = "https://api.messagesystem.com";
    public maxTryPerRequest: number = 3;

    private constructor() {}

    public static getInstance(): GlobalSingleton {
        if (!GlobalSingleton.instance) {
            GlobalSingleton.instance = new GlobalSingleton();
        }
        return GlobalSingleton.instance;
    }
}


class MessageFactory implements IMessageFactory {
    createNotificationService(type: string): IEmailService | ISMSService | IPushNotificationService {
        switch (type) {
            case "email":
                return new EmailService();
            case "sms":
                return new SMSService();
            case "push":
                return new PushNotificationService();
            default:
                throw new Error(`Unknown notification type: ${type}`);
        }
    }
}

function main() {
    const config = GlobalSingleton.getInstance();
    config.appName = "My first design pattern app";

    const messageFactory = new MessageFactory();

    const emailService = messageFactory.createNotificationService("email") as IEmailService;
    emailService.sendEmail("joao@gmail", "Hello", "Hello world");

    const smsService = messageFactory.createNotificationService("sms") as ISMSService;
    smsService.sendSMS("11999999999", "Hello world");

    const pushNotificationService = messageFactory.createNotificationService("push") as IPushNotificationService;
    pushNotificationService.sendPushNotification("joao", "Hello world");
}

main();