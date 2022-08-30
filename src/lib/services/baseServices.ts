import axios from "axios";
import _ from "lodash";
import { getAllCookies } from "@/lib/helpers";
import { ADMIN_API_BASE_URL } from "@/lib/helpers";
import { NRC_DATA } from "@/lib/constants";
import { NRC } from "@/lib/models";

export const getData = async (url: string, params?: any) => {
  try {
    const { authToken } = getAllCookies();
    const response = await axios.get(`${ADMIN_API_BASE_URL}/${url}`, {
      params,
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (err: any) {
    return {
      success: false,
      data: [],
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const getPaginatedData = async (url: string, params?: any) => {
  try {
    const { authToken } = getAllCookies();
    const response = await axios.get(`${ADMIN_API_BASE_URL}/${url}`, {
      params,
      headers: {
        Authorization: authToken,
      },
    });
    return response;
  } catch (err: any) {
    return err;
  }
};

export const getDetails = async (url: string, id?: string | number) => {
  try {
    const modifiedUrl = id
      ? `${ADMIN_API_BASE_URL}/${url}/${id}`
      : `${ADMIN_API_BASE_URL}/${url}`;
    const { authToken } = getAllCookies();
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: authToken,
      },
    });
    return response?.data;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const postData = async (url: string, data: any, lang?: string) => {
  try {
    const { authToken } = getAllCookies();
    const response = await axios.post(`${ADMIN_API_BASE_URL}/${url}`, data, {
      headers: {
        Authorization: authToken,
      },
    });

    return response.data;
  } catch (err: any) {
    return {
      success: false,
      data: err?.response?.data?.data,
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const updateData = async (
  url: string,
  data?: any,
  id?: number | string
) => {
  try {
    const { authToken } = getAllCookies();
    const putUrl = id ? `${url}/${id}` : `${url}`;
    const response = await axios.put(`${ADMIN_API_BASE_URL}/${putUrl}`, data, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const deleteData = async (url: string, id?: number) => {
  try {
    const modifiedUrl = id
      ? `${ADMIN_API_BASE_URL}/${url}/${id}`
      : `${ADMIN_API_BASE_URL}/${url}`;
    const { authToken } = getAllCookies();
    const response = await axios.delete(modifiedUrl, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const patchData = async (url: string, data?: any, id?: number) => {
  try {
    const { authToken } = getAllCookies();
    const putUrl = id ? `${url}/${id}` : `${url}`;
    const response = await axios.patch(
      `${ADMIN_API_BASE_URL}/${putUrl}`,
      data,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const getRegionList = () => {
  try {
    return {
      success: true,
      data: NRC_DATA?.map((item: any, index: number) => ({
        id: index + 1,
        value: (item.regionCode),
        label: (item.regionCode),
      })),
      status: 200,
      message: "success",
    };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      status: 404,
      message: "Something went wrong!!",
    };
  }
};

export const getTownShips = (region: string) => {
  try {
    return {
      success: true,
      data: NRC_DATA?.find((item: NRC) => {
        return (item.regionCode) == region;
      })?.townships,
      status: 200,
      message: "success",
    };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      status: 404,
      message: "Something went wrong!!",
    };
  }
};
