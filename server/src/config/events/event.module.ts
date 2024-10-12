import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [EventEmitterModule],
})
export class EventModule {}
