import * as React from 'react';
import { FieldDetails } from './FieldDetails';

import { ClickablePropertyNameCell, RequiredLabel } from '../../common-elements/fields';

import {
  PropertyBullet,
  PropertyDetailsCell,
  PropertyNameCell,
} from '../../common-elements/fields-layout';

import { ShelfIcon } from '../../common-elements/';

import { FieldModel } from '../../services/models';

export interface FieldProps {
  className?: string;
  onClick?: () => void;
  isLast?: boolean;
  showExamples?: boolean;

  field: FieldModel;

  renderDiscriminatorSwitch?: (opts: FieldProps) => JSX.Element;
}

export class Field extends React.PureComponent<FieldProps> {
  render() {
    const { className, field, isLast } = this.props;
    const { name, expanded, deprecated, required } = field;

    const paramName = this.props.onClick ? (
      <ClickablePropertyNameCell
        onClick={this.props.onClick}
        className={deprecated ? 'deprecated' : ''}
      >
        <PropertyBullet />
        {name}
        <ShelfIcon size={'1.2em'} direction={expanded ? 'down' : 'right'} />
        {required && <RequiredLabel> required </RequiredLabel>}
      </ClickablePropertyNameCell>
    ) : (
      <PropertyNameCell className={deprecated ? 'deprecated' : undefined}>
        <PropertyBullet />
        {name}
        {required && <RequiredLabel> required </RequiredLabel>}
      </PropertyNameCell>
    );
    return (
      <tr className={isLast ? 'last ' + className : className}>
        {paramName}
        <PropertyDetailsCell>
          <FieldDetails {...this.props} />
        </PropertyDetailsCell>
      </tr>
    );
  }
}