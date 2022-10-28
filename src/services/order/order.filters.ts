import {OrderInput} from "../../models/order/order.interface";

export default interface OrderFilters {
    isDeleted?: boolean;
    includeDeleted?: boolean;
    returnWithIds?: boolean;
    where?: Partial<OrderInput>;
    login?: string;
    priceRange?: number[];
    dateRange?: number[];
    limit?: number;
    page?: number;
    order?: Array<any>;
};