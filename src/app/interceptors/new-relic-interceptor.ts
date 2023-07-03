import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return newrelic.setTransactionName(
      context.getArgs().pop().operation.name.value,
      function () {
        const transaction = newrelic.getTransaction();
        return next.handle().pipe(tap(() => transaction.end()));
      },
    );
  }
}
