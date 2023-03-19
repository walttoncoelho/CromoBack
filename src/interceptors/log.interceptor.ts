import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<any>
  {
    let start = Date.now();

    return next.handle().pipe(tap(() => {
      let request = context.switchToHttp().getRequest();
      console.log(`URL: ${request.url}`);
      console.log(`Took ${Date.now() - start} ms.`);
    }));
  }
}