import { defineCollection, z } from 'astro:content';

const fishingFacilitiesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    region: z.string(),
    facilityType: z.string(),
    prefecture: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    // その他の必要なメタデータ
  })
});

export const collections = {
  'fishing-facilities': fishingFacilitiesCollection
};