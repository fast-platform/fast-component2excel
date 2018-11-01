import BaseComponent from './BaseComponent/BaseComponent';
import TextFieldComponent from './TextFieldComponent/TextFieldComponent';
import NumberComponent from './NumberComponent/NumberComponent';
import FieldsetComponent from './FieldsetComponent/FieldsetComponent';
import DatagridComponent from './DatagridComponent/DatagridComponent';
import ColumnsComponent from './ColumnsComponent/ColumnsComponent';
import EditgridComponent from './EditgridComponent/EditgridComponent';
import TableComponent from './TableComponent/TableComponent';
import EmailComponent from './EmailComponent/EmailComponent';
import PasswordComponent from './PasswordComponent/PasswordComponent';
import SelectComponent from './SelectComponent/SelectComponent';
import DatetimeComponent from './DatetimeComponent/DatetimeComponent';
import DayComponent from './DayComponent/DayComponent';
import TextareaComponent from './TextareaComponent/TextareaComponent';

export default function ComponentFactory(component) {
  switch (component.type) {
    case 'textfield':
      return TextFieldComponent({component: component});

    case 'textarea':
      return TextareaComponent({component: component});

    case 'number':
      return NumberComponent({component: component});

    case 'fieldset':
      return FieldsetComponent({component: component});

    case 'datagrid':
      return DatagridComponent({component: component});

    case 'columns':
      return ColumnsComponent({component: component});

    case 'editgrid':
      return EditgridComponent({component: component});

    case 'table':
      return TableComponent({component: component});

    case 'email':
      return EmailComponent({component: component});

    case 'password':
      return PasswordComponent({component: component});

    case 'select':
    case 'radio':
      return SelectComponent({component: component});

    case 'datetime':
      return DatetimeComponent({component: component});

    case 'day':
      return DayComponent({component: component});

    default:
      return BaseComponent({component: component});
  }
};
