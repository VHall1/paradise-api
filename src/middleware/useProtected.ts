import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const useProtected: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  const origin = context.req.headers.origin;

  if (origin?.includes('nui://') || typeof origin !== 'undefined') {
    // Likely to be some type of client
    // Skip request for protected method
    return;
  }

  return next();
};
