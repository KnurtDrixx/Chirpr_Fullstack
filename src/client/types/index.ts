

export interface Chirps {
    id: number;
    user_id: Users['id'];
    content: string;
    location: string;
    created_at: Date | string;
}

export interface Users {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date | string;
}

export interface UpdateChirpInfo {
    user_id:number; 
    content:string; 
    location:string;
}

//make a mentions type for the mentions section