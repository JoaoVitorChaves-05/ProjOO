import { IEmailService, ISMSService, IPushNotificationService, IMessageFactory, IMessageFactoryProxy, ISomeAPI, ISender } from "./interfaces";

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
    createMessageService(type: string): IEmailService | ISMSService | IPushNotificationService {
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

class MessageFactoryProxy implements IMessageFactoryProxy {
    private messageFactory: IMessageFactory;

    constructor() {
        this.messageFactory = new MessageFactory()
    }

    createMessageService(type: string): IEmailService | ISMSService | IPushNotificationService {
        switch (type) {
            case "email":
                console.log("Instância de e-mail criada em ", new Date().toString())
                return this.messageFactory.createMessageService('email');
            case "sms":
                console.log("Instância de SMS criada em ", new Date().toString())
                return this.messageFactory.createMessageService('sms');
            case "push":
                console.log("Instância de Push Notification criada em ", new Date().toString())
                return this.messageFactory.createMessageService('push');
            default:
                throw new Error(`Unknown notification type: ${type}`);
        }
    }
}

class SomeAPI implements ISomeAPI {
    sendSomeMessage(from: string, to: string, message: string) {
        console.log(`Sending SMS ${from} to ${to} with message "${message}"`);
    }
}

class SendSMSAdapter implements ISender {

    private someAPI: ISomeAPI;

    constructor() {
        this.someAPI = new SomeAPI();
    }

    public send(from: string, to: string, message: string) {
        this.someAPI.sendSomeMessage(from, to, message)
    }
}

function main() {
    const config = GlobalSingleton.getInstance();
    config.appName = "My first design pattern app";

    const messageFactory = new MessageFactory();

    const emailService = messageFactory.createMessageService("email") as IEmailService;
    emailService.sendEmail("joao@gmail", "Hello", "Hello world");

    const smsService = messageFactory.createMessageService("sms") as ISMSService;
    smsService.sendSMS("11999999999", "Hello world");

    const pushNotificationService = messageFactory.createMessageService("push") as IPushNotificationService;
    pushNotificationService.sendPushNotification("joao", "Hello world");

    // Teste da nova implementação de adapter
    const externalAPI: SendSMSAdapter = new SendSMSAdapter();
    externalAPI.send("11999999999", "12999999999", "Hello, world!");

    // Teste da nova implementação de proxy
    const messageFactoryProxy: MessageFactoryProxy = new MessageFactoryProxy();
    messageFactoryProxy.createMessageService('email');
    messageFactoryProxy.createMessageService('sms');
    messageFactoryProxy.createMessageService('push')
}

main();