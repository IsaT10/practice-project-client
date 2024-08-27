import { BaseQueryApi } from '@reduxjs/toolkit/query';
import React, { ReactNode } from 'react';

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

export type TPathItem = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TPathItem[];
};

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export type TErrorData = {
  success: boolean;
  message: string;
  err?: object;
  stack?: string;
};

export type TErrorResponse = {
  status: number;
  data: TErrorData;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TDataResponse<T> = {
  status: number;
  data?: T;
  messasge: string;
  success: boolean;
  meta?: TMeta;
};
export type TDataResponseRedux<T> = TDataResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
