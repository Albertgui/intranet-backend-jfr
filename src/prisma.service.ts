import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('No fue posible encontrar la base de datos');
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexión exitosa a la base de datos');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          'Error al conectar con la base de datos',
          error.stack,
        );
      } else {
        this.logger.error(
          'Error al conectar con la base de datos',
          String(error),
        );
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
