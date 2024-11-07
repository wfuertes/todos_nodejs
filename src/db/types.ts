export type Page<T> = {
    items: T[];
    total: number;
    totalPages: number;
    page: number;
    size: number;
}

export type PageableQuery = {
    page: number;
    size: number;
}