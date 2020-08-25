/**
 * @method
 * @description Get coach
 * @group coach
 * @auth true
 */
export default async (request: Request.RPC, context: Ctx): Promise<any> => (
  {
    id: request.principalId,
  }
);
