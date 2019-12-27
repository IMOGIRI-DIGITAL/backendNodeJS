// interface get data user
export interface UserGet {
    id: string;
    username: string;
    password: string;
    userFirstName: string;
    userLastName: string;
    userPhone: string | number;
    userEmail: string;
}

// interface save data user
export interface UserRegister {
    id?: string;
    username: string;
    password: string;
    c_password?: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
}

export interface UserSaveData {
    id?: string;
    username: string;
    password: string;
    c_password?: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhone: string | number;
}