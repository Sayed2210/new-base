import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableDialogSkelaton from '../TableDialogSkelaton.vue';

describe('TableDialogSkelaton', () => {
  it('renders without errors', () => {
    const wrapper = mount(TableDialogSkelaton);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the skeleton list container', () => {
    const wrapper = mount(TableDialogSkelaton);
    expect(wrapper.find('.document-type-skeleton-list').exists()).toBe(true);
  });

  it('renders 6 skeleton rows by default', () => {
    const wrapper = mount(TableDialogSkelaton);
    const rows = wrapper.findAll('.skeleton-row');
    expect(rows.length).toBe(6);
  });

  it('renders the correct number of rows when rows prop is provided', () => {
    const wrapper = mount(TableDialogSkelaton, { props: { rows: 3 } });
    const rows = wrapper.findAll('.skeleton-row');
    expect(rows.length).toBe(3);
  });

  it('renders skeleton icon elements in each row', () => {
    const wrapper = mount(TableDialogSkelaton, { props: { rows: 1 } });
    const icons = wrapper.findAll('.skeleton-icon');
    expect(icons.length).toBe(2);
  });
});
