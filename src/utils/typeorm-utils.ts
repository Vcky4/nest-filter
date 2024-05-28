import { SelectQueryBuilder } from 'typeorm';

interface Filter {
    field: string;
    value: any;
    operator: 'equals' | 'not' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'notIn' | 'isNull' | 'isNotNull';
}

interface Sort {
    field: string;
    order: 'ASC' | 'DESC';
}

export function applyPagination<T>(query: SelectQueryBuilder<T>, page: string, limit: string): SelectQueryBuilder<T> {
    const pageNumber = parseInt(page, 10) || 0;
    const pageSize = parseInt(limit, 10) || 10;
    const offset = pageNumber * pageSize;
    return query.skip(offset).take(pageSize);
}

export function applyFilters<T>(query: SelectQueryBuilder<T>, filters: string): SelectQueryBuilder<T> {
    const filterArray = (filters ? JSON.parse(filters) : []) as Filter[];
    filterArray.forEach((filter, index) => {
        const paramKey = `filter_${index}`;
        switch (filter.operator) {
            case 'equals':
                query.andWhere(`"${filter.field}" = :${paramKey}`, { [paramKey]: filter.value });
                break;
            case 'not':
                query.andWhere(`"${filter.field}" != :${paramKey}`, { [paramKey]: filter.value });
                break;
            case 'gt':
                query.andWhere(`"${filter.field}" > :${paramKey}`, { [paramKey]: filter.value });
                break;
            case 'gte':
                query.andWhere(`"${filter.field}" >= :${paramKey}`, { [paramKey]: filter.value });
                break;
            case 'lt':
                query.andWhere(`"${filter.field}" < :${paramKey}`, { [paramKey]: filter.value });
                break;
            case 'lte':
                query.andWhere(`"${filter.field}" <= :${paramKey}`, { [paramKey]: filter.value });
                break;
            case 'like':
                query.andWhere(`"${filter.field}" LIKE :${paramKey}`, { [paramKey]: `%${filter.value}%` });
                break;
            case 'in':
                query.andWhere(`"${filter.field}" IN (:...${paramKey})`, { [paramKey]: filter.value });
                break;
            case 'notIn':
                query.andWhere(`"${filter.field}" NOT IN (:...${paramKey})`, { [paramKey]: filter.value });
                break;
            case 'isNull':
                query.andWhere(`"${filter.field}" IS NULL`);
                break;
            case 'isNotNull':
                query.andWhere(`"${filter.field}" IS NOT NULL`);
                break;
        }
    });
    return query;
}

export function applySorting<T>(query: SelectQueryBuilder<T>, sorts: string): SelectQueryBuilder<T> {
    const sortArray = (sorts ? JSON.parse(sorts) : []) as Sort[];
    sortArray.forEach(sort => {
        query.addOrderBy(`"${sort.field}"`, sort.order);
    });
    return query;
}