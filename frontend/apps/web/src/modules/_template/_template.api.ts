import { api } from '@/store/api';
import type { TemplateEntity } from './_template.types';

export const templateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTemplateEntities: builder.query<TemplateEntity[], void>({
      query: () => '/template-entities',
    }),
  }),
});

export const { useGetTemplateEntitiesQuery } = templateApi;
