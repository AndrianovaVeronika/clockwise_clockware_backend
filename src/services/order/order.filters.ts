import {OrderInput} from "../../models/order/order.interface";

export default interface OrderFilters {
    isDeleted?: boolean;
    includeDeleted?: boolean;
    returnWithIds?: boolean;
    where?: Partial<OrderInput>;
    name?: string;
    email?: string;
    priceRange?: number[];
    dateRange?: number[];
    limit?: number;
    page?: number;
};