/* eslint-disable jsx-a11y/label-has-for */
// In this case the control comes inside the 'react-switch' component

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Switch from 'react-switch';
import { colours, fontSize, fontFamily } from '../../theme/airways';

const BORDER_WIDTH = 2;

function styleOverrides({ spaceBetween, handleSize, width, checked }) {
  return {
    marginLeft: spaceBetween,
    backgroundColor: colours.darkerGrey,
    '.react-switch-handle': {
      height: `${handleSize}px!important`,
      width: `${handleSize}px!important`,
      top: `${BORDER_WIDTH}px!important`,
      transform: checked
        ? `translateX(${width - handleSize - BORDER_WIDTH}px)!important`
        : `translateX(${BORDER_WIDTH}px)!important`
    },
    '.react-switch-bg': {
      margin: '0!important',
      transition:
        'background 150ms ease 0s, box-shadow 150ms ease 0s !important',
      boxShadow: checked
        ? 'none'
        : `inset ${colours.darkGrey} 0px 0px 0px ${BORDER_WIDTH}px`
    }
  };
}

class Toggle extends Component {
  static isControlled = props => typeof props.checked === 'boolean';

  state = {
    checked: false
  };

  handleChange = () => {
    if (Toggle.isControlled(this.props)) {
      this.props.onChange();
    } else {
      this.setState(
        prevState => ({ checked: !prevState.checked }),
        () => this.props.onChange(this.state.checked)
      );
    }
  };

  getCheckedState = () =>
    Toggle.isControlled(this.props) ? this.props.checked : this.state.checked;

  render = () => {
    const { spaceBetween, handleSize, height, id, label, width } = this.props;

    const checked = this.getCheckedState();

    return (
      <div
        css={{
          backgroundColor: colours.mediumGrey,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <label
          htmlFor={id}
          css={{
            textTransform: 'none',
            color: colours.white,
            fontSize: fontSize.body,
            fontFamily: fontFamily.main
          }}
        >
          {label}
        </label>
        <Switch
          id={id}
          checked={this.getCheckedState()}
          onChange={this.handleChange}
          offColor={colours.darkerGrey}
          onColor={colours.highlights}
          handleDiameter={handleSize}
          offHandleColor={colours.dullGrey}
          onHandleColor={colours.white}
          boxShadow="0px 0px 1px 0px rgba(0, 0, 0, 0.3)"
          uncheckedIcon={false}
          checkedIcon={false}
          height={height}
          width={width}
          className={css(
            styleOverrides({ spaceBetween, handleSize, width, checked })
          )}
        />
      </div>
    );
  };
}

Toggle.propTypes = {
  /** Id for the html input */
  id: PropTypes.string,
  /** Label to display */
  label: PropTypes.string.isRequired,
  /** Function triggered when the value is changed
   * @param {bool} value The new value
   */
  onChange: PropTypes.func,
  /** Flag to control whether the toggle is checked */
  checked: PropTypes.bool,
  /** String to specify in css units the space between toggle and label */
  spaceBetween: PropTypes.string,
  /** The size of the toggle handle */
  handleSize: PropTypes.number,
  /** The height of the toggle */
  height: PropTypes.number,
  /** The width of the toggle */
  width: PropTypes.number
};

Toggle.defaultProps = {
  id: '',
  onChange: () => {},
  checked: null,
  spaceBetween: '10px',
  handleSize: 26,
  height: 30,
  width: 46
};

export default Toggle;
