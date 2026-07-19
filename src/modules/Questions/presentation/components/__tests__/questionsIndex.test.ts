import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import questionsIndex from '../questionsIndex.vue';

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: {} } });

// Mock dependencies
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { country_code: 'eg' },
    query: { page: '1', word: '' },
    fullPath: '/eg/questions',
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  createRouter: vi.fn(() => ({
    getRoutes: vi.fn(() => []),
    beforeEach: vi.fn(),
    afterEach: vi.fn(),
  })),
  createWebHistory: vi.fn(),
}));

vi.mock('../../controllers/questions.controller', () => ({
  default: {
    getInstance: () => ({
      listState: { value: {} },
      fetchList: vi.fn(),
      pagination: { value: {} },
    }),
  },
}));

const globalConfig = {
  plugins: [createPinia(), i18n],
  stubs: {
    'router-link': true,
    DataStatusBuilder: true,
    AppTable: true,
    Pagination: true,
    DeleteDialog: true,
    FilterDialog: true,
    IndexSearchIcon: true,
    IndexPluseIcon: true,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('questionsIndex.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = mount(questionsIndex, { global: globalConfig });
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the search input', () => {
    const wrapper = mount(questionsIndex, { global: globalConfig });
    const searchInput = wrapper.find('.search-input');
    expect(searchInput.exists()).toBe(true);
  });

  it('contains the "Add Questions" button', () => {
    const wrapper = mount(questionsIndex, { global: globalConfig });
    const addButton = wrapper.find('.btn-add');
    expect(addButton.exists()).toBe(true);
  });
});
