export interface Role {
  id: number;
  name: string;
  contact_number: number;
  address: string;
  blocked: boolean;
  salary_cycle_start_day: string;
  login_id: string;
  password: string;
}
export interface User {
  id: number;
  name: string;
  contact_number: number;
  address: string;
  blocked: boolean;
  salary_cycle_start_day: string;
  login_id: string;
  password: string;
}
export interface Company {
  id: number;
  name: string;
  contact_number: number;
  address: string;
  blocked: boolean;
  salary_cycle_start_day: string;
  login_id: string;
  password: string;
}

export interface OtcReason {
  id: number;
  reason_type: string;
  portal_message: string;
  app_message?: string;
}


export interface NRC {
  regionCode:string,
  townships: string []
}
