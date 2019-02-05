import Counter from '@/components/counter/counter.vue';
import { mount } from '@vue/test-utils';

describe('counter.vue', () => {
  it('sets the correct default data', () => {
    const wrapper = mount(Counter, {
      propsData: {
        count: 0,
      },
    });
    expect(wrapper.find('label').text()).toBe('0');
  });

  it('increments the count value', () => {
    const wrapper = mount(Counter, {
      propsData: {
        count: 0,
      },
    });

    wrapper.find('button').trigger('click');
    expect(wrapper.find('label').text()).toBe('1');
  });
});
