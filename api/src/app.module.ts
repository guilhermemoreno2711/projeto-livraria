import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './database/prisma.module';
import { ItemsModule } from './items/items.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './authentication/authentication.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminsModule,
    ItemsModule,
    CategoriesModule,
    ReportsModule,
  ],
})
export class AppModule {}
