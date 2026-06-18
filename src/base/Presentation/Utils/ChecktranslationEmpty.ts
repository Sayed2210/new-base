type TranslationValue = Record<string, string | null | undefined>;

export const hasEmptyTranslationKey = (
  translations: Record<string, any> | null | undefined,
  key: string,
): boolean => {
  if (!translations || typeof translations !== 'object') return true;

  const value = translations[key] as TranslationValue | undefined;

  // key not found
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return true;
  }

  // key exists but has no langs
  if (!Object.keys(value).length) {
    return true;
  }

  // if at least one lang has value => NOT empty
  const hasAtLeastOneValue = Object.values(value).some((langValue) => {
    return String(langValue ?? '').trim().length > 0;
  });

  return !hasAtLeastOneValue;
};
