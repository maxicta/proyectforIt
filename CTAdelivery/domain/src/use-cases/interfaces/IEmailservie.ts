interface IEmailService {
    sendEmailConfirmation(email: string, name: string): Promise<void>;
}