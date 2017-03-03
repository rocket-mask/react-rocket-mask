import React, { Component } from 'react';
import { MaskedInput } from 'nebo15-mask';

export default class NeboMask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    this.mask.model = props.value;
  }

  componentDidMount() {
    const {
      mask,
      showOnFocus = true,
      hideOnBlur = true,
      showAlways,
      withPlaceholder,
      onChange
    } = this.props;

    this.mask = new MaskedInput(this.masked, mask, {
      placeholder: withPlaceholder,
      showOnFocus,
      hideOnBlur,
      showAlways,
      onModelChange: model => onChange(model)
    });
    this.mask.model = this.props.value;
  }

  render() {
    const { props, mask = {} } = this;
    const {
      component = 'input',
      showOnFocus,
      hideOnBlur,
      showAlways,
      withPlaceholder,
      onChange,
      value,
      onBlur,
      ...rest
    } = props;

    return React.createElement(component, {
      ref: el => (this.masked = el),
      ...rest,
      vakue: mask.viewValue || '',
      onBlur: () => onBlur(mask.model)
    });
  }
}
