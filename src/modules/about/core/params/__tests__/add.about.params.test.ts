import { describe, expect, it } from 'vitest';
import AddAboutParams from '../add.about.params';
import TranslationParams from '../translation.params';

describe('AddAboutParams', () => {
  it('maps image as a base64 string', () => {
    const imageBase64 = 'data:image/png;base64,aW1hZ2U=';
    const translation = new TranslationParams({
      title: { en: 'About', ar: 'عن' },
      description: { en: 'Description', ar: 'وصف' },
    });

    const params = new AddAboutParams({
      translation,
      images: imageBase64,
      socialMedia: [],
    });

    expect(params.toMap()).toEqual({
      translations: translation,
      image: imageBase64,
      social_links: [],
    });
  });
});
