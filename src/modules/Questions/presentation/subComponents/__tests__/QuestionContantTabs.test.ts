import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import QuestionContantTabs from '../QuestionContantTabs.vue';
import ShowQuestionsModel from '../../../core/models/show.questions.model';

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: {} } });

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: '1' },
    query: {},
  }),
}));

vi.mock('../../../presentation/controllers/FullSubjectTree/full.subject.tree.controller', () => ({
  default: {
    getInstance: () => ({
      fetchList: vi.fn(() => Promise.resolve({ data: [] })),
    }),
  },
}));

vi.mock(
  '@/modules/EducationClassification/presentation/controllers/EducationTopics/education.topics.controller',
  () => ({
    default: {
      getInstance: () => ({
        listData: { value: [] },
        fetchList: vi.fn(),
      }),
    },
  }),
);

vi.mock('@/modules/Skills/presentation/controllers/skills.controller', () => ({
  default: {
    getInstance: () => ({
      listData: { value: [] },
    }),
  },
}));

vi.mock('@/modules/Stages/presentation/controllers/stage.controller', () => ({
  default: {
    getInstance: () => ({
      listData: { value: [] },
      fetchList: vi.fn(),
    }),
  },
}));

const globalConfig = {
  plugins: [createPinia(), i18n],
  stubs: {
    UpdatedCustomInputSelect: true,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('QuestionContantTabs.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const mockContentData = new ShowQuestionsModel({
      id: 1,
      questionTitle: 'Test Question',
      difficulty: 1,
      topics: [],
      skills: [],
      subjectTree: { id: 1, title: 'Branch' },
      sequenceTree: { id: 2, title: 'Sequence' },
    });

    const wrapper = mount(QuestionContantTabs, {
      props: {
        ContentData: mockContentData,
      },
      global: globalConfig,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
