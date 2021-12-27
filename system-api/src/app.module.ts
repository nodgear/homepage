import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationsModule } from './donations/donations.module';
import { AdministratorsModule } from './administrators/administrators.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let uri: any;
        uri = configService.get<string>('DB_URL');
        if (!uri) throw new Error('banco de dados não configurado.');
        return { uri };
      },
      inject: [ConfigService],
    }),
    DonationsModule,
    AdministratorsModule,
    ActionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
