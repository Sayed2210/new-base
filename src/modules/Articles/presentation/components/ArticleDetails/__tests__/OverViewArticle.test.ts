import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowQuestionsModel from '@/modules/Questions/core/models/show.questions.model';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: { id: '42', country_code: 'eg' },
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('../../controllers/Article.controller', () => ({
  default: {
    getInstance: () => ({
      delete: vi.fn().mockResolvedValue({}),
    }),
  },
}));

import OverViewArticle from '../OverViewArticle.vue';

const mockArticle = new ShowQuestionsModel({
  question_id: 101,
  question: 'Sample Article Title',
  question_description: 'Sample description',
  number_of_questions: 5,
  created_at: '2024-01-01',
  created_by: { id: '1', title: 'Admin' },
  subjectTree: { id: 1, title: 'Math', full_title: 'Math -> Algebra' },
  e_c_subject: { id: 2, title: 'Algebra' },
  document: [],
});

const globalConfig = {
  mocks: { $t: (key: string) => key },
  stubs: {
    'router-link': { template: '<a><slot /></a>', props: ['to'] },
    FolderCrudIcon: true,
    ArticlePencil: true,
    AchiveIcon: true,
    DeletIArticle: true,
    DeleteDialog: true,
    CopyIcon: true,
    Articlearrow: true,
    Articlesubject: true,
  },
};

describe('OverViewArticle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const wrapper = mount(OverViewArticle, {
      props: { artical: mockArticle },
      global: globalConfig,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the article overview container', () => {
    const wrapper = mount(OverViewArticle, {
      props: { artical: mockArticle },
      global: globalConfig,
    });
    expect(wrapper.find('.All_over_view').exists()).toBe(true);
  });

  it('renders the form header', () => {
    const wrapper = mount(OverViewArticle, {
      props: { artical: mockArticle },
      global: globalConfig,
    });
    expect(wrapper.find('.form-header').exists()).toBe(true);
  });

  it('displays the article question_id', () => {
    const wrapper = mount(OverViewArticle, {
      props: { artical: mockArticle },
      global: globalConfig,
    });
    expect(wrapper.text()).toContain('101');
  });

  it('displays the article title', () => {
    const wrapper = mount(OverViewArticle, {
      props: { artical: mockArticle },
      global: globalConfig,
    });
    expect(wrapper.text()).toContain('Sample Article Title');
  });

  it('displays N/A when question_description is empty', () => {
    const emptyArticle = new ShowQuestionsModel({});
    const wrapper = mount(OverViewArticle, {
      props: { artical: emptyArticle },
      global: globalConfig,
    });
    expect(wrapper.text()).toContain('N/A');
  });
});
