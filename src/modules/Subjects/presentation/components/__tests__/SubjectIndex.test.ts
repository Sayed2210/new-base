import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';
import SubjectIndex from '../SubjectIndex.vue';
import SubjectController from '../../controllers/subject.controller';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => ({
    params: { country_code: 'eg' },
    query: {},
  }),
}));

vi.mock('../../controllers/subject.controller', () => ({
  default: { getInstance: vi.fn() },
}));

vi.mock('@/base/Presentation/Utils/debouced', () => ({
  debounce: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
}));

vi.mock('@/stores/formsStore', () => ({
  useFormsStore: () => ({ formData: {} }),
}));

const educationTree = [
  {
    id: 103,
    title: 'New EducationClassification',
    branches: [
      {
        id: 235,
        e_c_branch_id: 235,
        title: 'branch 1',
        children: [
          {
            id: 236,
            e_c_branch_id: 236,
            title: 'branch2',
            children: [
              {
                id: 237,
                e_c_branch_id: 237,
                title: 'branch 3',
                children: [],
                subjects: [
                  {
                    id: 219,
                    e_c_subject_id: 219,
                    title: 'subject 1',
                    children: [
                      {
                        id: 220,
                        e_c_subject_id: 220,
                        title: 'subject2',
                        children: [
                          {
                            id: 221,
                            e_c_subject_id: 221,
                            title: 'subject 3',
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
            subjects: [],
          },
        ],
        subjects: [],
      },
    ],
  },
];

describe('SubjectIndex.vue', () => {
  let mockFetchList: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    mockFetchList = vi.fn().mockResolvedValue({});
    vi.mocked(SubjectController.getInstance).mockReturnValue({
      fetchList: mockFetchList,
      delete: vi.fn().mockResolvedValue({}),
      pagination: ref(null),
      listState: ref({ status: 'success', data: educationTree }),
    } as unknown as ReturnType<typeof SubjectController.getInstance>);
  });

  const mountOptions = {
    global: {
      mocks: { $t: (msg: string) => msg },
      stubs: {
        DataStatusBuilder: { template: '<div><slot name="success" /><slot name="empty" /></div>' },
        AppTable: { template: '<div class="app-table-stub" />', props: ['headers', 'items'] },
        UpdatedCustomInputSelect: {
          template:
            '<div class="education-filter" :data-label="label" :data-placeholder="placeholder" />',
          props: ['modelValue', 'label', 'staticOptions', 'placeholder', 'reload'],
        },
        DeleteDialog: true,
        'router-link': { template: '<a><slot /></a>', props: ['to'] },
      },
    },
  };

  it('renders the index wrapper', () => {
    const wrapper = mount(SubjectIndex, mountOptions);
    expect(wrapper.find('.subject-page').exists()).toBe(true);
  });

  it('renders the classification filter from the fetched tree', async () => {
    const wrapper = mount(SubjectIndex, mountOptions);
    await flushPromises();

    const filter = wrapper.find('.education-filter');
    expect(wrapper.findAll('.education-filter')).toHaveLength(1);
    expect(filter.exists()).toBe(true);
    expect(filter.attributes('data-label')).toBe('education_classification');
  });

  it('calls fetchList on mount without pagination and caches the tree', async () => {
    mount(SubjectIndex, mountOptions);
    await flushPromises();

    expect(mockFetchList).toHaveBeenCalledTimes(1);
    expect(mockFetchList.mock.calls[0][0].toMap()).toMatchObject({ with_pagination: 0 });
    expect(sessionStorage.getItem('subjects_full_education_classification_tree')).toContain(
      'New EducationClassification',
    );
  });

  it('shows add button link', () => {
    const wrapper = mount(SubjectIndex, mountOptions);
    const links = wrapper.findAll('a');
    expect(links.length).toBeGreaterThan(0);
  });
});
