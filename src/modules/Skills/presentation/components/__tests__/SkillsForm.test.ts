import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    fullPath: '/skills/add',
    params: {},
  })),
}));

import SkillsForm from '../SkillsForm.vue';

const globalConfig = {
  mocks: { $t: (key: string) => key },
  stubs: {
    MultiLangInput: true,
  },
};

describe('SkillsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const wrapper = mount(SkillsForm, { global: globalConfig });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the form header card', () => {
    const wrapper = mount(SkillsForm, { global: globalConfig });
    expect(wrapper.find('.employee-details-form-card').exists()).toBe(true);
  });

  it('shows Add New Skill title when no route id', () => {
    const wrapper = mount(SkillsForm, { global: globalConfig });
    expect(wrapper.find('h3').text()).toContain('Add New Skill');
  });

  it('renders the form fields section', () => {
    const wrapper = mount(SkillsForm, { global: globalConfig });
    expect(wrapper.find('.form-fields').exists()).toBe(true);
  });
});
