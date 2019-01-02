export class Profile {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public email_verified_at?: string,
        public password?: string,
        public avatar?: string,
        public created_at?: string,
        public updated_at?: string
    ) {}
}
