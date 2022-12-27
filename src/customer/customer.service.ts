import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerModel.findOne({ email: createCustomerDto.email }).exec();
    if (existingCustomer) {
      throw new Error('A customer with this email address already exists');
    }
    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 16);
    const createdCustomer = new this.customerModel({
      ...createCustomerDto,
      password: hashedPassword,
    });
    return createdCustomer.save();
  }

  async login(email: string, password: string): Promise<Customer> {
    const customer = await this.customerModel.findOne({ email }).exec();
    if (!customer) {
      throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    return this.customerModel.findById(id).exec();
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.customerModel.findByIdAndDelete(id).exec();
  }
}
