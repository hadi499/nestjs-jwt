import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/createProductDto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    return await this.productRepo.findOne({ where: { id: id } });
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto);
    await this.productRepo.save(product);
    return product;
  }

  // async update(id: number, updateProductDto: UpdateProductDto) {
  //   return await this.productRepo.update(id, updateProductDto);
  // }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Melakukan pembaruan produk di dalam transaksi
    const productToUpdate = await this.productRepo.findOne({
      where: { id: id },
    });
    if (!productToUpdate) {
      throw new Error('Product not found');
    }

    // Melakukan pembaruan dengan data baru
    Object.assign(productToUpdate, updateProductDto);

    // Menyimpan perubahan ke dalam database
    await this.productRepo.save(productToUpdate);

    // Mengembalikan produk yang telah diperbarui
    return productToUpdate;
  }
}
