import MapComponent from './map-component.vue';
import { mount } from '@vue/test-utils';

describe('map-component.vue', () => {
  it('initializes successfully', () => {
    const wrapper = mount(MapComponent, {
    propsData: {
      message: 'test success',
    },
    });
    expect(wrapper).toBeTruthy();
  });
});
