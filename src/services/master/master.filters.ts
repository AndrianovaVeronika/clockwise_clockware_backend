import {MasterInput} from "../../models/master/master.interface";

export default interface MasterFilters {
    isDeleted?: boolean;
    includeDeleted?: boolean;
    where?: Partial<MasterInput>;
    ratingRange?: number[];
    limit?: number;
    page?: number;
};