import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'nest_lat',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin123',
  entities: [User, Product],
  synchronize: true,
};

export default config;
