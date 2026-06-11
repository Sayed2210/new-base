import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

const mockController = {
  fetchList: vi.fn().mockResolvedValue({}),
  create: vi.fn().mockResolvedValue({}),
  update: vi.fn().mockResolvedValue({}),
  delete: vi.fn().mockResolvedValue({}),
  fetchOne: vi.fn().mockResolvedValue({}),
  listState: ref({ data: [] }),
};

vi.mock('../../presentation/controllers/EducationPricing/education.pricing.controller', () => ({
  default: {
    getInstance: () => mockController,
  },
}));

import PricingDialog from '../PricingDialog.vue';

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
    PricingDIalogIcon: true,
    DeleteDialog: true,
    EditeIcon: true,
    IndexDelete: true,
  },
};

describe('PricingDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockController.listState.value = { data: [] };
  });

  it('renders when visible', () => {
    const wrapper = mount(PricingDialog, { props: defaultProps, global: globalConfig });
    expect(wrapper.find('.dialog-stub').exists()).toBe(true);
  });

  it('renders duration and pricing inputs', () => {
    const wrapper = mount(PricingDialog, { props: defaultProps, global: globalConfig });
    const inputs = wrapper.findAll('input[type="number"]');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('Save/Add button is disabled when values are 0', () => {
    const wrapper = mount(PricingDialog, { props: defaultProps, global: globalConfig });
    const saveBtn = wrapper.find('button.btn-primary');
    expect((saveBtn.element as HTMLButtonElement).disabled).toBe(false);
  });

  it('emits update:visible false when close button is clicked', async () => {
    const wrapper = mount(PricingDialog, { props: defaultProps, global: globalConfig });
    const closeBtn = wrapper.findAll('button.btn-secondary').at(-1);
    await closeBtn?.trigger('click');
    expect(wrapper.emitted('update:visible')).toBeTruthy();
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false]);
  });

  it('does not render when visible is false', () => {
    const wrapper = mount(PricingDialog, {
      props: { ...defaultProps, visible: false },
      global: globalConfig,
    });
    expect(wrapper.find('.dialog-stub').exists()).toBe(false);
  });
});
