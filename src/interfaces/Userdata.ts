export default interface IUserdata {
    _id: string;
    username: string;
    email: string;
    role: number;
    solved: Array<string>;
    completed: Array<string>;
    points: number;
}