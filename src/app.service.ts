import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { error: boolean, message: string } {
    return {
      error: false,
      message: "Sejam bem-vindos à API da CROMO"
    };
  }
}
