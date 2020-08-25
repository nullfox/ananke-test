/**
 * @generic
 * @description Error handler
 */
export default async (error: Boom, context: Ctx): Promise<Error> => {
  if (error.isServer) {
    context.Sentry.captureException(error);
    await context.Sentry.flush(2000);
  }

  return error;
};
