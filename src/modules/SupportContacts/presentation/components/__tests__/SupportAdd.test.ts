import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-router')>();
  return {
    ...actual,
    useRoute: vi.fn(() => ({
      fullPath: '/support/add',
      params: {},
    })),
    useRouter: vi.fn(() => ({ push: vi.fn() })),
  };
});

vi.mock('../controllers/support.controller', () => ({
  default: {
    getInstance: () => ({
      create: vi.fn().mockResolvedValue({}),
      errorMessage: { value: '' },
    }),
  },
}));

import SupportAdd from '../SupportAdd.vue';

const globalConfig = {
  mocks: { $t: (key: string) => key },
  stubs: {
    SupportForm: true,
  },
};

describe('SupportAdd', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const wrapper = mount(SupportAdd, { global: globalConfig });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the save button', () => {
    const wrapper = mount(SupportAdd, { global: globalConfig });
    const saveBtn = wrapper.find('button.btn-primary');
    expect(saveBtn.exists()).toBe(true);
    expect(saveBtn.text()).toContain('save');
  });

  it('renders the support add page wrapper', () => {
    const wrapper = mount(SupportAdd, { global: globalConfig });
    expect(wrapper.find('.support-add-page').exists()).toBe(true);
  });
});
