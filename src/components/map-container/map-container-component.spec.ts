import MapContainer from './map-container-component.vue';
import { mount } from '@vue/test-utils';

describe('map-container-component.vue', () => {
  it('sets the correct default data', () => {
    const wrapper = mount(MapContainer, {
    propsData: {
      count: 0,
    },
    });
    expect(wrapper.find('label').text()).toBe('0');
  });

  it('increments the count value', () => {
    const wrapper = mount(MapContainer, {
      propsData: {
        count: 0,
      },
    });

    wrapper.find('button').trigger('click');
    expect(wrapper.find('label').text()).toBe('1');
  });
});
