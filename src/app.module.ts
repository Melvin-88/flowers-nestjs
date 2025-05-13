import { Module } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FlowersModule, UsersModule, AuthModule],
})
export class AppModule {}
