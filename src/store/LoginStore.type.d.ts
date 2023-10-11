interface LoginStoreType{
    user: string;
    pass: string;
    login: (user: string, pass: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}