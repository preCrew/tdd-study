import { rest } from 'msw';
import { weatherMock } from './mockDatas';

export const handlers = [
  rest.get(process.env.REACT_APP_WEATHER_URL as string, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(weatherMock));
  }),
];
