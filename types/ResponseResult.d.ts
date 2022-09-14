interface ResponseResult<T> {
  code: number;
  message: any;
  type: "success" | "error";
  result: T;
}
