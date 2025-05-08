export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
export default class GetListRequest {
  offset: number;
  limit: number;
  current_page?: number;
  order: Order;
  sort_column: string;
  sort_direction: Order;

  constructor({
    limit = 10,
    offset = 4,
    order = Order.ASC,
    current_page = 1,
    sort_column = "id",
    sort_direction = Order.ASC,
  }: {
    offset: number;
    limit: number;
    order: Order;
    current_page?: number;
    sort_column: string;
    sort_direction: Order;
  }) {
    this.limit = limit;
    this.offset = offset;
    this.order = order;
    this.current_page = current_page;
    this.sort_column = sort_column;
    this.sort_direction = sort_direction;
  }
}
