export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export class TableRequest<T> {
  offset: number;
  search?: string;
  limit: number;
  current_page?: number;
  order: Order;
  sort_column: string;
  sort_direction: Order;
  filters?: Partial<T>; // Permite agregar filtros específicos para cada tipo de dato.

  constructor({
    limit = 10,
    search = "",
    offset = 4,
    order = Order.ASC,
    current_page = 1,
    sort_column = "id",
    sort_direction = Order.ASC,
    filters = {} as Partial<T>, // Filtros específicos de cada tipo
  }: {
    limit: number;
    offset: number;
    order: Order;
    current_page?: number;
    sort_column: string;
    search: string;
    sort_direction: Order;
    filters?: Partial<T>; // Filtros específicos de cada tipo
  }) {
    this.limit = limit;
    this.search = search;
    this.offset = offset;
    this.order = order;
    this.current_page = current_page;
    this.sort_column = sort_column;
    this.sort_direction = sort_direction;
    this.filters = filters;
  }
}
