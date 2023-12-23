import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    newrelic.setTransactionName(gqlContext.getContext().req.body.operationName);
    return next.handle();
  }
}
