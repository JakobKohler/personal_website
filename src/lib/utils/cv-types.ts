export interface Degree {
    program: string;
    startDate: string;
    endDate: string;
    highlights: string[];
    grade?: string;
    status?: string;
}

export interface Education {
    institution: string;
    degrees: Degree[];
}

export interface Role {
    position: string;
    type: string;
    startDate: string;
    endDate: string;
    highlights: string[];
    skills?: string[];
    title?: string;
}

export interface Work {
    company: string;
    location: string;
    roles: Role[];
}

export interface CVData {
    education: Education[];
    work: Work[];
}