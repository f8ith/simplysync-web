import { OptionBase } from "chakra-react-select";

export interface ServiceOption extends OptionBase {
  label: Service["name"];
  value: Service;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  currency: string;
  is_active: boolean;
  is_visible: boolean;
  duration: number;
  capacity: number;
}

export interface Booking {
  id: number;
  code: number;
  start_datetime: string;
  end_datetime: string;
  duration: number;
  service: Service;
  service_id: number;
  client: Client;
  client_id: number;
}

export interface Client {
  id: number;
  email: string;
  name: string;
  phone: string;
  __typename: string;
}