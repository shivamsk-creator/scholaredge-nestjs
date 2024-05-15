import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60000s' },
  }), MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.DB_URL,
      dbName: "practice"
    }),
  }), UsersModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
