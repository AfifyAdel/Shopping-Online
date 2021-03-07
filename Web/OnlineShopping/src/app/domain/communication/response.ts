import { Responsestatus } from "../constants/enums/responsestatus.enum";

export class Response<T> {
  message: string;
  resource: T;
  status: Responsestatus;
}
