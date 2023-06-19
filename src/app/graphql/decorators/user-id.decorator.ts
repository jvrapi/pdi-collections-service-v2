import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserId = createParamDecorator((_, context) => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  return req.user.payload.sub;
});
