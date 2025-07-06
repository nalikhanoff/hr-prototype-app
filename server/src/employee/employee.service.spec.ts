import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { EmployeeService } from './employee.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: PrismaService;

  const mockPrismaService = {
    employee: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEmployees', () => {
    it('should return a list of employees with company included', async () => {
      const companyId = 'company-xyz';
      const expectedResult = [
        { id: '1', firstName: 'John', companyId, company: { id: companyId, name: 'company-xyz' } },
      ];
      mockPrismaService.employee.findMany.mockResolvedValue(expectedResult);

      const result = await service.getEmployees(companyId);
      expect(result).toEqual(expectedResult);
      expect(prisma.employee.findMany).toHaveBeenCalledWith({
        include: { company: true },
        where: { companyId },
      });
    });
  });

  describe('EmployeeService - createEmployee', () => {
    const companyId = 'company-xyz';
    const dto: CreateEmployeeDto = {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      position: 'Designer',
    };

    it('should create a new employee and return isSuccess true', async () => {
      mockPrismaService.employee.create.mockResolvedValue({
        id: 'emp-001',
        role: 'EMPLOYEE',
        ...dto,
      });

      const result = await service.createEmployee(dto, companyId);

      expect(mockPrismaService.employee.create).toHaveBeenCalledWith({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          position: dto.position,
          companyId,
          role: 'EMPLOYEE',
        },
      });

      expect(result).toEqual({ isSuccess: true });
    });

    it('should throw an error if email is duplicate (Prisma error code P2002)', async () => {
      mockPrismaService.employee.create.mockRejectedValue(
        new PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '6.11.1',
        } as any),
      );

      await expect(service.createEmployee(dto, companyId)).rejects.toThrow('Unique constraint failed');

      expect(mockPrismaService.employee.create).toHaveBeenCalled();
    });
  });

  describe('updateEmployee', () => {
    const employeeId = 'emp-001';
    const companyId = 'company-xyz';

    const dto: CreateEmployeeDto = {
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob@example.com',
      position: 'QA Engineer',
    };

    it('should update an existing employee and return isSuccess', async () => {
      mockPrismaService.employee.update.mockResolvedValue({
        id: employeeId,
        ...dto,
      });

      const result = await service.updateEmployee(employeeId, dto, companyId);

      expect(mockPrismaService.employee.update).toHaveBeenCalledWith({
        where: { id: employeeId },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          position: dto.position,
          companyId,
        },
      });

      expect(result).toEqual({ isSuccess: true });
    });

    it('should throw an error if employee is not found (Prisma error code P2025)', async () => {
      mockPrismaService.employee.update.mockRejectedValue(
        new PrismaClientKnownRequestError('Employee not found', {
          code: 'P2025',
          clientVersion: '6.11.1',
        } as any),
      );

      await expect(service.updateEmployee(employeeId, dto, companyId)).rejects.toThrow('Employee not found');
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee and return isSuccess', async () => {
      const id = 'employee789';
      mockPrismaService.employee.delete.mockResolvedValue({});

      const result = await service.deleteEmployee(id);
      expect(result).toEqual({ isSuccess: true });
      expect(prisma.employee.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
