import { rangeStringFormatter } from './convertLayoutToExcelCoord';
import BaseLayoutComponent from '../components/BaseLayoutComponent/BaseLayoutComponent';

export default async function positionBuilder(component, previousComponent, type) {
  let position = {};

  switch (type) {
    case 'base':
      position = {
        row: 1,
        col: 1,
        range: rangeStringFormatter(1, 1, component.shape.rows, component.shape.cols)
      };
      break;

    case 'firstInForm':
      position = {
        row: previousComponent.position.row,
        col: previousComponent.position.col,
        range: rangeStringFormatter(
          previousComponent.position.row,
          previousComponent.position.col,
          previousComponent.position.row + component.shape.rows - 1,
          previousComponent.position.col + component.shape.cols - 1
        )
      };
      break;

    case 'firstInLayout':
      position = {
        row: previousComponent.position.row + BaseLayoutComponent.marginWidth / 2,
        col: previousComponent.position.col + BaseLayoutComponent.marginLength / 2,
        range: rangeStringFormatter(
          previousComponent.position.row + BaseLayoutComponent.marginWidth / 2,
          previousComponent.position.col + BaseLayoutComponent.marginLength / 2,
          previousComponent.position.row + BaseLayoutComponent.marginWidth / 2 + component.shape.rows - 1,
          previousComponent.position.col + BaseLayoutComponent.marginLength / 2 + component.shape.cols - 1
        )
      };
      break;

    case 'below':
      position = {
        row: previousComponent.position.row + previousComponent.shape.rows,
        col: previousComponent.position.col,
        range: rangeStringFormatter(
          previousComponent.position.row + previousComponent.shape.rows,
          previousComponent.position.col,
          previousComponent.position.row + previousComponent.shape.rows + component.shape.rows - 1,
          previousComponent.position.col + component.shape.cols - 1
        )
      };
      break;
  }

  return position;
}
