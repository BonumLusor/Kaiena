export type client = {
    name: string;
    id: number;
    cod_categories_client: number;
  }

export type relational = {
    cod_radiologist: number,
    cod_clinic: number,
    id: number

}

export type relationalData = {
    cod_radiologist: number,
    cod_clinic: number,
    related_day: string,
}