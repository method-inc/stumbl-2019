import GoogleMap from './google-map-component.vue';
import { mount } from '@vue/test-utils';

describe('google-map-component.vue', () => {
  it('initializes successfully', () => {
    const wrapper = mount(GoogleMap, {
    propsData: {
      message: 'test success',
    },
    });
    expect(wrapper).toBeTruthy();
  });
});
