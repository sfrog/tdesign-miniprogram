import { SuperComponent, wxComponent, ComponentsOptionsType } from '../common/src/index';
import config from '../common/config';
import Props from './props';

const { prefix } = config;
const classPrefix = `${prefix}-checkbox`;
@wxComponent()
export default class CheckBox extends SuperComponent {
  externalClasses = [
    `${prefix}-class`,
    `${prefix}-class-label`,
    `${prefix}-class-icon`,
    `${prefix}-class-content`,
    `${prefix}-class-border`,
  ];

  behaviors = ['wx://form-field'];

  relations = {
    '../checkbox-group/checkbox-group': {
      type: 'ancestor' as 'ancestor',
    },
  };

  options: ComponentsOptionsType = {
    multipleSlots: true,
    styleIsolation: 'shared',
  };

  properties = {
    ...Props,
    theme: {
      type: String,
      value: 'default',
    },
    borderless: {
      type: Boolean,
      value: false,
    },
  };

  data = {
    prefix,
    classPrefix,
  };

  controlledProps = [
    {
      key: 'checked',
      event: 'change',
    },
  ];

  methods = {
    onChange(e: WechatMiniprogram.TouchEvent) {
      const { disabled, readonly } = this.data;

      if (disabled || readonly) return;

      const { target } = e.currentTarget.dataset;
      const { contentDisabled } = this.data;

      if (target === 'text' && contentDisabled) {
        return;
      }

      const { value, checked, checkAll } = this.data;
      const [parent] = this.getRelationNodes('../checkbox-group/checkbox-group');

      if (parent) {
        parent.updateValue({ key: value, checked: !checked, checkAll });
      } else {
        this._trigger('change', { checked: !checked });
      }
    },
  };
}
