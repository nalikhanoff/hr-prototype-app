export type CompanyType = {
  id: string;
  name: string;
};

export type StateType = {
    data: CompanyType | null;
    isFetching: boolean;
    error: string;
};
