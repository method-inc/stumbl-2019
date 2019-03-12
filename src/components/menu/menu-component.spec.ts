import Menu from '@/components/menu/menu-component.vue';
import { mount } from '@vue/test-utils';

describe('Menu.vue', () => {
  it('sets menu li from props', () => {
    const wrapper = mount(Menu, {
      propsData: {
        menuTitles: [
          {
            href: '',
            title: 'Testing',
          },
        ],
      },
    });
    expect(wrapper.find('li').text()).toBe('Testing');
  });
});
