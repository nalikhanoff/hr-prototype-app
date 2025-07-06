import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [EmployeeModule, CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
