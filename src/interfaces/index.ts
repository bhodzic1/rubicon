export interface IMovie {
    id: string;
    poster_path: string;
    title: string;
    overview?: string;
}

export interface IState {
    movies: IMovie[];
    query: string;
}
