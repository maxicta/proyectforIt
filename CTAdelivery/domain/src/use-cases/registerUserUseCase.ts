import {User} from '../entities/User'
import { Address } from '../value-objects/Address';
import { Email } from '../value-objects/Email';
export class RegisterUserUseCase {
    constructor(
        private readonly userRerpository: IUserRepository,
        private readonly emailService: IEmailService,
        private readonly passWordHasher: IPasswordHasher
    ) {}

    async excecute(
        userData: RegisterUserRequest
    ): Promise<RegisterUserResponse> {
        this.validateInput(userData);

        const { email, password, name, phone } = userData;

        const existingUser = await this.userRerpository.findByEmail(email);
        if (existingUser) {
            throw new Error("El email ya se encuentra registrado");
        }

        const existingPhone = await this.userRerpository.findByPhone(phone);
        if (existingPhone) {
            throw new Error("El telefono ya se encuentra registrado");
        }

        

        const hashedPassword = await this.passWordHasher.hash(password);

        const user : User = {
            id: this.generateId(),
            email: Email.create(email),
            name: name,
            phone: phone,
            addresses: Address,
            password: hashedPassword,
            createdAt: new Date(),
            isVerified: false,
        };

        const savedUser = await this.userRerpository.save(user);

        await this.emailService.sendEmailConfirmation(
            savedUser.email.value,
            savedUser.name
        );

        return {
            success: true,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                name: savedUser.name,
                phone: savedUser.phone,
                createdAt: savedUser.createdAt,
            },
        };
    }

    private validateInput(userData: RegisterUserRequest): void {
        if (!userData) {
            throw new Error("Los datos de usuario son requeridos");
        }
        const { email, password, name, phone } = userData;
        if (!email || !password || !name || !phone) {
            throw new Error(
                "Email, contraseña, nombre y teléfono son requeridos"
            );
        }
        if (password.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres");
        }
        if (name.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }
    }

    private generateId(): string {
        // implementar generador de id
        return Date.now().toString();
    }
}
