import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    fullPath: '/skills/add',
    params: {},
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('../controllers/skills.controller', () => ({
  default: {
    getInstance: () => ({
      create: vi.fn().mockResolvedValue({}),
      errorMessage: { value: '' },
    }),
  },
}));

import SkillsAdd from '../SkillsAdd.vue';

const globalConfig = {
  mocks: { $t: (key: string) => key },
  stubs: {
    SkillsForm: true,
  },
};

describe('SkillsAdd', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const wrapper = mount(SkillsAdd, { global: globalConfig });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the save button', () => {
    const wrapper = mount(SkillsAdd, { global: globalConfig });
    const saveBtn = wrapper.find('button.btn-primary');
    expect(saveBtn.exists()).toBe(true);
    expect(saveBtn.text()).toContain('save');
  });

  it('renders the cancel button', () => {
    const wrapper = mount(SkillsAdd, { global: globalConfig });
    const cancelBtn = wrapper.find('button.btn-cancel');
    expect(cancelBtn.exists()).toBe(true);
  });

  it('renders the add page wrapper', () => {
    const wrapper = mount(SkillsAdd, { global: globalConfig });
    expect(wrapper.find('.employee-add-page').exists()).toBe(true);
  });
});
