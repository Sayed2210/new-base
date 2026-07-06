import { describe, expect, it } from 'vitest';
import EditAboutParams from '../edit.about.params';
import TranslationParams from '../translation.params';

describe('EditAboutParams', () => {
  it('maps image as a base64 string', () => {
    const imageBase64 = 'data:image/png;base64,aW1hZ2U=';
    const translations = new TranslationParams({
      title: { en: 'About', ar: 'عن' },
      description: { en: 'Description', ar: 'وصف' },
    });

    const params = new EditAboutParams({
      translations,
      images: imageBase64,
      socialMedia: [],
    });

    expect(params.toMap()).toEqual({
      translations,
      image: imageBase64,
      social_links: [],
    });
  });
});
