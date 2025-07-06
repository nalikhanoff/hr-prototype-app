import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  getEmployees(companyId: string) {
    return this.prisma.employee.findMany({
      where: {
        companyId,
      },
      include: {
        company: true,
      },
    });
  }

  async createEmployee(params: CreateEmployeeDto, companyId: string) {
    const { firstName, lastName, position, email } = params;

    await this.prisma.employee.create({
      data: {
        firstName,
        lastName,
        position,
        email,
        companyId,
        role: 'EMPLOYEE',
      },
    });

    return { isSuccess: true };
  }

  async updateEmployee(id: string, params: CreateEmployeeDto, companyId: string) {
    const { firstName, lastName, position, email } = params;

    await this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        position,
        email,
        companyId,
      },
    });

    return { isSuccess: true };
  }

  async deleteEmployee(id: string) {
    await this.prisma.employee.delete({
      where: {
        id,
      },
    });

    return { isSuccess: true };
  }
}
