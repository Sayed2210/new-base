import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

const mockTopicsController = {
  fetchList: vi.fn().mockResolvedValue({}),
  create: vi.fn().mockResolvedValue({}),
  update: vi.fn().mockResolvedValue({}),
  delete: vi.fn().mockResolvedValue({}),
  fetchOne: vi.fn().mockResolvedValue({}),
  listState: ref({ data: [] }),
};

vi.mock('../../presentation/controllers/EducationTopics/education.topics.controller', () => ({
  default: {
    getInstance: () => mockTopicsController,
  },
}));

import TopicsDialog from '../TopicsDialog.vue';

const defaultProps = {
  visible: true,
  level: 1,
  branchName: 'Test Branch',
  branchId: 10,
};

const globalConfig = {
  mocks: { $t: (key: string) => key },
  stubs: {
    Dialog: {
      template: '<div v-if="visible" class="dialog-stub"><slot name="header" /><slot /></div>',
      props: ['visible'],
    },
    MultiLangInput: true,
    DeleteDialog: true,
    EditeIcon: true,
    IndexDelete: true,
  },
};

describe('TopicsDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTopicsController.listState.value = { data: [] };
  });

  it('renders when visible', () => {
    const wrapper = mount(TopicsDialog, { props: defaultProps, global: globalConfig });
    expect(wrapper.find('.dialog-stub').exists()).toBe(true);
  });

  it('Add button is disabled when title is empty', () => {
    const wrapper = mount(TopicsDialog, { props: defaultProps, global: globalConfig });
    const addBtn = wrapper.find('button.btn-primary');
    expect((addBtn.element as HTMLButtonElement).disabled).toBe(true);
  });

  it('emits update:visible false when close button is clicked', async () => {
    const wrapper = mount(TopicsDialog, { props: defaultProps, global: globalConfig });
    const closeBtn = wrapper.findAll('button.btn-secondary').at(-1);
    await closeBtn?.trigger('click');
    expect(wrapper.emitted('update:visible')).toBeTruthy();
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false]);
  });

  it('does not render when visible is false', () => {
    const wrapper = mount(TopicsDialog, {
      props: { ...defaultProps, visible: false },
      global: globalConfig,
    });
    expect(wrapper.find('.dialog-stub').exists()).toBe(false);
  });
});
