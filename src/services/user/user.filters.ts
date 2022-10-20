import {OrderInput} from "../../models/order/order.interface";

export default interface UserFilters {
    isDeleted?: boolean;
    includeDeleted?: boolean;
    excludePassword?: boolean;
    where?: Partial<OrderInput>;
};