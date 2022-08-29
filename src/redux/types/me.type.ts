

export interface MeI {
    email: string,
    // password: string,
    Nombres: string,
    Apellido1: string,
    Apellido2: string,
    foto: string
}

export interface ReduxMe {
    me?: MeI | null
    haveData?: boolean | null
}