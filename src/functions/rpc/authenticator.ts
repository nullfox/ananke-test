import { badRequest } from '@hapi/boom';

/**
 * @generic
 * @description RPC authenticator
 */
export default async (header: string, context: Ctx): Promise<any> => {
  try {
    const decoded = await context.JWT.verify(header);

    return (decoded as DecodedJWT).sub;
  } catch (error) {
    throw badRequest(error.message);
  }
};
