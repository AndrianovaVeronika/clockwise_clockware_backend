import {CityInput} from "../../models/city/city.interface";

export default interface CityFilters {
    isDeleted?: boolean;
    includeDeleted?: boolean;
    where?: Partial<CityInput>;
    priceRange?: number[]
};