import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getEmployees(@Headers('x-company-id') companyId: string) {
    if (!companyId) {
      throw new BadRequestException('company id is not provided');
    }

    return this.employeeService.getEmployees(companyId);
  }

  @Post()
  createEmployee(@Body() dto: CreateEmployeeDto, @Headers('x-company-id') companyId: string) {
    if (!companyId) {
      throw new BadRequestException('company id is not provided');
    }

    return this.employeeService.createEmployee(dto, companyId);
  }

  @Put(':id')
  updateEmployee(@Param('id') id: string, @Body() dto: CreateEmployeeDto, @Headers('x-company-id') companyId: string) {
    if (!companyId) {
      throw new BadRequestException('company id is not provided');
    }

    return this.employeeService.updateEmployee(id, dto, companyId);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
