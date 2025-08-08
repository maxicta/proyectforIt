import { Email } from "../value-objects/Email";

interface UserProps {
    id: string;
    email: Email;
    name: string;
    phone: string;
    password: string;
    createdAt: Date;
    isVerified: boolean;
}

class User {
    public readonly id: string;
    public readonly email: Email;
    public readonly name: string;
    public readonly phone: string;
    public readonly password: string;
    public readonly createdAt: Date;
    public readonly isVerified: boolean;

    constructor(props: UserProps) {
        this.id = props.id;
        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.password = props.password;
        this.createdAt = props.createdAt;
        this.isVerified = props.isVerified;
    }
}

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

        const user = new User({
            id: this.generateId(),
            email: Email.create(email),
            name: name,
            phone: phone,
            password: hashedPassword,
            createdAt: new Date(),
            isVerified: false,
        });

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
        // En producción usarías UUID o similar
        return Date.now().toString();
    }
}
