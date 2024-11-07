import { PageableQuery } from "./types";

export class PageUtils {

    public static offset(query: PageableQuery): number {
        if (query.page === 0) {
            return 0;
        }

        if (query.page > 0) {
            return (query.page - 1) * query.size;
        }
        
        throw new Error("Invalid page number");
    }
}