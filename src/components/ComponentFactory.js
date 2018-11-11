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
import CheckboxComponent from './CheckboxComponent/CheckboxComponent';
import SelectBoxesComponent from './SelectBoxesComponent/SelectBoxesComponent';
import CurrencyComponent from './CurrencyComponent/CurrencyComponent';
import PhoneNumberComponent from './PhoneNumberComponent/PhoneNumberComponent';
import TimeComponent from './TimeComponent/TimeComponent';
import AddressComponent from './AddressComponent/AddressComponent';
import SurveyComponent from './SurveyComponent/SurveyComponent';
import RadioComponent from './RadioComponent/RadioComponent';

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

    case 'radio':
      return RadioComponent({component: component});

    case 'select':
      return SelectComponent({component: component});

    case 'datetime':
      return DatetimeComponent({component: component});

    case 'day':
      return DayComponent({component: component});

    case 'checkbox':
      return CheckboxComponent({component: component});

    case 'selectboxes':
      return SelectBoxesComponent({component: component});

    case 'currency':
      return CurrencyComponent({component: component});

    case 'phoneNumber':
      return PhoneNumberComponent({component: component});

    case 'time':
      return TimeComponent({component: component});

    case 'address':
      return AddressComponent({component: component});

    case 'survey':
      return SurveyComponent({component: component});

    default:
      return BaseComponent({component: component});
  }
};
