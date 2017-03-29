import React, { Component } from 'react';
import { MaskedInput } from 'nebo15-mask';

export default class NeboMask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      mask,
      showOnFocus = true,
      hideOnBlur = true,
      showAlways,
      withPlaceholder,
      onChange,
    } = this.props;

    this.mask = new MaskedInput(this.masked, mask, {
      placeholder: withPlaceholder,
      showOnFocus,
      hideOnBlur,
      showAlways,
      onModelChange: model => onChange(model),
    });

    if (this.props.value) this.mask.model = this.mask.autocomplete(this.props.value);
  }

  componentWillReceiveProps(props) {
    if (this.mask.value !== props.value) {
      this.mask.value = this.mask.autocomplete(props.value);
    }
  }

  render() {
    const { props, mask = {} } = this;
    const {
      component = 'input',
      showOnFocus, hideOnBlur, showAlways, withPlaceholder, onChange, value, // eslint-disable-line
      onBlur,
      ...rest,
    } = props;

    return React.createElement(component, {
      ref: el => (this.masked = el),
      ...rest,
      onBlur: () => onBlur(mask.model),
    });
  }
}
