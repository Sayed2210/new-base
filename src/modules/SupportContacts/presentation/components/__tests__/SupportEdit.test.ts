import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

const mockPush = vi.fn();
const mockRoute = {
  params: { country_code: 'eg', id: '2' },
  fullPath: '/eg/support/edit/2',
};

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('../../controllers/support.controller', () => ({
  default: {
    getInstance: vi.fn(),
  },
}));

vi.mock('../SupportForm.vue', () => ({
  default: {
    props: ['initialSections'],
    template:
      '<div class="mock-support-form">{{ initialSections.map((section) => section.id).join(",") }}</div>',
  },
}));

vi.mock('@/base/Core/NetworkStructure/Resources/dataState/dataState', () => ({
  DataSuccess: class DataSuccess {
    data: unknown;
    constructor(data: unknown) {
      this.data = data;
    }
  },
}));

import SupportEdit from '../SupportEdit.vue';
import SupportContactsController from '../../controllers/support.controller';
import { DataSuccess } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';

describe('SupportEdit.vue', () => {
  let mockFetchOne: ReturnType<typeof vi.fn>;
  let mockUpdate: ReturnType<typeof vi.fn>;
  let mockErrorMessage: ReturnType<typeof ref>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchOne = vi
      .fn()
      .mockResolvedValue(new DataSuccess({ id: 2, titles: {}, supportContacts: [] }));
    mockUpdate = vi.fn().mockResolvedValue(undefined);
    mockErrorMessage = ref('');
    (SupportContactsController.getInstance as ReturnType<typeof vi.fn>).mockReturnValue({
      fetchOne: mockFetchOne,
      update: mockUpdate,
      listState: ref(new DataSuccess([{ id: 1 }, { id: 3 }])),
      errorMessage: mockErrorMessage,
    });
  });

  const mountOptions = {
    global: {
      mocks: { $t: (msg: string) => msg },
    },
  };

  it('renders without errors', () => {
    const wrapper = mount(SupportEdit, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the support-edit-page container', () => {
    const wrapper = mount(SupportEdit, mountOptions);
    expect(wrapper.find('.support-edit-page').exists()).toBe(true);
  });

  it('calls fetchOne on mount', () => {
    mount(SupportEdit, mountOptions);
    expect(mockFetchOne).toHaveBeenCalledTimes(1);
  });

  it('renders only the requested support item and ignores stale list state', async () => {
    const wrapper = mount(SupportEdit, mountOptions);
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 0));

    expect(wrapper.find('.mock-support-form').text()).toBe('2');
  });

  it('shows edit-actions after mount resolves', async () => {
    const wrapper = mount(SupportEdit, mountOptions);
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 0));
    expect(wrapper.find('.edit-actions').exists()).toBe(true);
  });

  it('cancel button navigates to support index', async () => {
    const wrapper = mount(SupportEdit, mountOptions);
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 0));
    const cancelBtn = wrapper.find('.btn-cancel');
    await cancelBtn.trigger('click');
    expect(mockPush).toHaveBeenCalledWith('/eg/support');
  });

  it('does not show error toast when errorMessage is empty', async () => {
    const wrapper = mount(SupportEdit, mountOptions);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.error-toast').exists()).toBe(false);
  });
});
