import { notFound } from '@hapi/boom';

/**
 * @method
 * @description Login coach
 * @group coach
 * @auth false
 * @param {string.email} email - Coach email address
 * @param {string} username - Coach username
 * @param {string.required} password - Coach password
 */
export default async (request: Request.RPC, context: Ctx): Promise<any> => {
  const coach = await context.Database.Coach.authenticate(
    request.params.email || request.params.username,
    request.params.password,
  );

  if (!coach) {
    throw notFound('No coach found with the supplied deets');
  }

  return coach;
};
