/**
 * @rest POST /webhook
 * @description Fake webhook!
 * @group coach
 * @auth true
 * @param {string.required} text - Webhook text
 */
export default async (request: Request.REST, context: Ctx): Promise<any> => (
  {
    text: request.payload!.text,
  }
);
