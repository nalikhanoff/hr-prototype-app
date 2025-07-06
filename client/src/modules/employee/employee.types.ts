export type CompanyType = {
    id: string;
    name: string;
};

export type EmployeeType = {
    id: string;
    companyId: string;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
};

export type EmployeeWithCompanyType = EmployeeType & {
    company: CompanyType;
}

