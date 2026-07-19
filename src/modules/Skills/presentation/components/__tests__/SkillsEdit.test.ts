import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    fullPath: '/skills/1/edit',
    params: { id: '1' },
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('../controllers/skills.controller', () => ({
  default: {
    getInstance: () => ({
      fetchOne: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({}),
      itemData: { value: null },
      errorMessage: { value: '' },
    }),
  },
}));

import SkillsEdit from '../SkillsEdit.vue';

const globalConfig = {
  mocks: { $t: (key: string) => key },
  stubs: {
    SkillsForm: true,
    IconAccept: true,
  },
};

describe('SkillsEdit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const wrapper = mount(SkillsEdit, { global: globalConfig });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the save button', () => {
    const wrapper = mount(SkillsEdit, { global: globalConfig });
    const saveBtn = wrapper.find('button.btn-primary');
    expect(saveBtn.exists()).toBe(true);
  });

  it('renders the skills edit page wrapper', () => {
    const wrapper = mount(SkillsEdit, { global: globalConfig });
    expect(wrapper.find('.skills-edit-page').exists()).toBe(true);
  });
});
