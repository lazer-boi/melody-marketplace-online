
declare interface Singer {
  id: number;
  name: string;
  contact: string;
  address: string;
}

declare interface Composer {
  id: number;
  name: string;
  contact: string;
  address: string;
}

declare interface RecordCompany {
  id: number;
  name: string;
  contact: string;
  address: string;
}

declare interface Customer {
  id: number;
  name: string;
  contact: string;
  address: string;
}

declare interface Song {
  id?: number;
  title: string;
  movie_name: string;
  price: number | string;
  duration: string;
  category: string;
  available_as: string;
  size: number | string;
  singer_id: number | '';
  composer_id: number | '';
  record_company_id: number | '';
  singer_name?: string;
  composer_name?: string;
  record_company_name?: string;
}
