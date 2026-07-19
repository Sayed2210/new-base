import { describe, expect, it } from 'vitest';
import AddAboutParams from '../add.about.params';
import EditAboutParams from '../edit.about.params';
import TranslationParams from '../translation.params';

const imageBase64 = 'data:image/png;base64,aW1hZ2U=';
const translations = new TranslationParams({
  title: { en: 'About', ar: 'عن' },
  description: { en: 'Description', ar: 'وصف' },
});

describe('About params', () => {
  it('maps add image as a base64 string', () => {
    const params = new AddAboutParams({
      translation: translations,
      images: imageBase64,
      socialMedia: [],
    });

    expect(params.toMap().image).toBe(imageBase64);
  });

  it('maps edit image as a base64 string', () => {
    const params = new EditAboutParams({
      translations,
      images: imageBase64,
      socialMedia: [],
    });

    expect(params.toMap().image).toBe(imageBase64);
  });
});
