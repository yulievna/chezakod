export interface Quest {
    id: number;
    slug: string;
    name: string;
    age: string;
    images: string[];
    players: string;
    time: string;
    difficulty: string;
    contact: string;
    address: string;
    description?: string;
    restrictions?: string[];
} 