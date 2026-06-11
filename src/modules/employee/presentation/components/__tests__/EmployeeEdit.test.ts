import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    fullPath: '/employees/1/edit',
    params: { id: '1' },
  })),
}));

vi.mock('../controllers/employee.controller', () => ({
  default: {
    getInstance: () => ({
      fetchOne: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({}),
      itemData: { value: null },
      errorMessage: { value: '' },
    }),
  },
}));

import EmployeeEdit from '../EmployeeEdit.vue';

const globalConfig = {
  mocks: { $t: (key: string) => key },
  stubs: {
    EmployeeForm: true,
    IconAccept: true,
    AppButton: true,
  },
};

describe('EmployeeEdit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const wrapper = mount(EmployeeEdit, { global: globalConfig });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the update employee button', () => {
    const wrapper = mount(EmployeeEdit, { global: globalConfig });
    const saveBtn = wrapper.find('button.btn-primary');
    expect(saveBtn.exists()).toBe(true);
    expect(saveBtn.text()).toContain('update_employee');
  });

  it('renders the EmployeeForm stub', () => {
    const wrapper = mount(EmployeeEdit, { global: globalConfig });
    expect(wrapper.find('employeeform-stub').exists()).toBe(true);
  });
});
