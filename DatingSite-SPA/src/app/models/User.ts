import { Photo } from './Photo';

export interface User {
    // general
    id: number;
    userName: string;
    gender: string;
    age: number;
    zodiacSign: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    // info
    growth: string;
    eyeColor: string;
    hairColor: string;
    martialStatus: string;
    education: string;
    profession: string;
    children: string;
    languages: string;
    // about me
    motto: string;
    description: string;
    personality: string;
    lookingFor: string;
    // hobby
    interests: string;
    freeTime: string;
    sport: string;
    movies: string;
    music: string;
    // preferences
    iLike: string;
    iDoNotLike: string;
    makesMeLaugh: string;
    itFeelsBestIn: string;
    friendsWouldDescribeMe?: any;
    // photos
    photos: Photo[];
    photoUrl: string;
}
