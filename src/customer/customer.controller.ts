import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { Customer } from './customer.schema';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string }): Promise<Customer> {
    return this.customerService.login(body.email, body.password);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.customerService.remove(id);
  }
}
