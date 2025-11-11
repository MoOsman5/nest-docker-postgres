import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: 'primary',
        type: 'postgres',
        host: process.env.DB_HOST_PRIMARY,
        port: Number(process.env.DB_PORT_PRIMARY),
        username: process.env.DB_USER_PRIMARY,
        password: process.env.DB_PASS_PRIMARY,
        database: process.env.DB_NAME_PRIMARY,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // only for development
      }),
    }),

    TypeOrmModule.forRootAsync({
      name: 'replica',
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST_REPLICA,
        port: Number(process.env.DB_PORT_REPLICA),
        username: process.env.DB_USER_REPLICA,
        password: process.env.DB_PASS_REPLICA,
        database: process.env.DB_NAME_REPLICA,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // replica must not modify schema
      }),
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
