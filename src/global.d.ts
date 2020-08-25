type Models = import('./models').Models;

type Bunyan = import('@ananke/runtime').Bunyan;
type Config = import('@ananke/config-ssm-convict').ConvictConfig;

type RPCRequest = import('@ananke/runtime').Request.RPC;
type RESTRequest = import('@ananke/runtime').Request.REST;
type Boom = import('@ananke/runtime').Boom;

type Sentry = import('@sentry/node');

interface DecodedJWT {
  sub: string | number;
}

namespace Request {
  interface RPC extends RPCRequest {}
  interface REST extends RESTRequest {}
}

namespace Response {
  interface Boom extends BoomResponse {}
}

interface Ctx {
  Logger: Bunyan;
  Config: Config;
  Database: Models;
  JWT: {
    verify: (string) => Promise<DecodedJWT | Error>
  };
  Sentry: Sentry;
}