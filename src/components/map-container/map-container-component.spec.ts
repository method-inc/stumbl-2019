import MapContainer from './map-container-component.vue';
import { mount } from '@vue/test-utils';

describe('map-container-component.vue', () => {
  it('initializes successfully', () => {
    const wrapper = mount(MapContainer, {
    propsData: {
      message: 'test success',
    },
    });
    expect(wrapper).toBeTruthy();
  });
});
