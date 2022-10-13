import {OrderInput} from "../../models/order/order.interface";

export default interface OrderFilters {
    isDeleted?: boolean;
    includeDeleted?: boolean;
    returnWithIds?: boolean;
    where?: Partial<OrderInput>;
    priceRange?: number[];
    dateRange?: number[];
};