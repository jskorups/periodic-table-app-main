export interface TableAction<T> {
  name: string;
  action: (data: T) => void;
}
