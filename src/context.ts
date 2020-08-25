import { Context } from '@ananke/runtime';

import Config, { Client } from '@ananke/config-ssm-convict';
import ConnectionManager from '@ananke/sequelize';

import {
  verify,
  VerifyErrors,
} from 'jsonwebtoken';

import * as Sentry from '@sentry/node';

import * as Models from './models';

export default Context.factory(
  'test'
)
  .inject(
    'Config',
    async () => (
      Config.factory(
        {
          'common.database.host': 'foobar',
        },
        new Client({ region: 'us-east-1' }),
      )
        .fetch('/olympus/development')
    ),
  )
  .inject(
    'Database',
    async (context: Ctx) => (
      ConnectionManager.factory(
        ConnectionManager.createConnection(
          {
            ...context.Config.get('common.database'),
            username: context.Config.get('common.database.user'),
            database: 'olympus_generic',
          },
          {
            dialect: 'mysql',
          },
        )
      )
          .setup(Models, {})
    ),
  )
  .inject(
    'Sentry',
    async (context: Ctx) => {
      Sentry.init({
        dsn: context.Config.get('common.sentry.dsn'),
      });

      return Sentry;
    },
  )
  .inject(
    'JWT',
    async (context: Ctx) => (
      // This would be its own class/file rather than fucked together here
      {
        verify: async (token: string) => (
          new Promise((resolve, reject) => {
            verify(
              token,
              context.Config.get('common.authentication.secret'),
              (err: VerifyErrors | null, decoded: object | undefined): void => {
                if (err) {
                  reject(err);
                } else {
                  resolve(decoded);
                }
              },
            );
          })
        ),
      }
    ),
  );