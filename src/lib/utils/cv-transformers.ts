import type { Education, Work } from './cv-types';

export function numberToLetter(n: number): string {
    if (!Number.isInteger(n) || n < 1 || n > 26) {
        return "";
    }
    return String.fromCharCode(n + 64);
}

export function formatEducation(rawEducation: Education[]) {
    if (!rawEducation) return [];
    
    return rawEducation.flatMap((edu, index: number) =>
        edu.degrees.map((degree) => ({
            time: degree.startDate,
            timeEnd: degree.endDate,
            trainId: `bis ${degree.endDate}`,
            destination: edu.institution,
            via: degree.program,
            delay: degree.status,
            track: (rawEducation.length - index).toString()
        }))
    );
}

export function formatWork(rawWork: Work[]) {
    if (!rawWork) return [];

    return rawWork.flatMap((workplace, index: number) =>
        workplace.roles.map((role, roleIndex: number) => {
            let track = (rawWork.length - index).toString();

            if (workplace.roles.length > 1) {
                track += numberToLetter(workplace.roles.length - roleIndex);
            }

            return {
                time: role.startDate,
                timeEnd: role.endDate,
                trainId: role.type,
                destination: workplace.company,
                via: `${role.position} ++++ ${role.type} ++++ ${workplace.location}`,
                track
            };
        })
    );
}