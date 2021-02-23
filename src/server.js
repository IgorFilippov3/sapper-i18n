import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { getLocale } from './locale-provider';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
      session: async (req) => ({
        locale: JSON.parse(await getLocale(req.originalUrl))
      })
    })
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
