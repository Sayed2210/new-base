import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { DataSuccess } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import SupportContactsController from '../../controllers/support.controller';
import SupportIndex from '../SupportIndex.vue';

// Mock dependencies
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { country_code: 'eg' },
    query: { page: '1', word: '' },
    fullPath: '/eg/employees',
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

const globalConfig = {
  plugins: [createPinia()],
  stubs: {
    'router-link': true,
    DataStatusBuilder: { template: '<div><slot name="success" /></div>' },
    AppTable: true,
    Pagination: true,
    DeleteDialog: {
      props: ['title', 'message', 'hasbtn'],
      template: '<button class="delete-dialog-stub"><slot name="btn" /></button>',
    },
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('SupportIndex.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    const controller = SupportContactsController.getInstance();
    controller.listState.value = new DataSuccess({
      data: [
        {
          id: 1,
          titles: 'Support',
          supportContacts: [{ key: 'emails', value: 'support@example.com' }],
        },
      ],
    });
    vi.spyOn(controller, 'fetchList').mockResolvedValue(controller.listState.value);
  });

  it('renders correctly', () => {
    const wrapper = mount(SupportIndex, { global: globalConfig });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the support contact page container', () => {
    const wrapper = mount(SupportIndex, { global: globalConfig });
    expect(wrapper.find('.support-contact-page').exists()).toBe(true);
  });

  it('renders the header container', () => {
    const wrapper = mount(SupportIndex, { global: globalConfig });
    expect(wrapper.find('.header-container').exists()).toBe(true);
  });

  it('renders the delete dialog trigger', () => {
    const wrapper = mount(SupportIndex, { global: globalConfig });
    expect(wrapper.find('.delete-dialog-stub .action-btn.delete').exists()).toBe(true);
  });
});
