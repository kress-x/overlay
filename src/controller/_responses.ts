import { STATUS_CODE } from "std/http/status.ts";

export const okay = {
  status: STATUS_CODE.OK,
  headers: { "content-type": "text/html" },
};

export const notFound = {
  status: STATUS_CODE.NotFound,
};
