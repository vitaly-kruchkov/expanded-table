import {
  DateEditor,
  EnumEditor,
  JsonEditor,
  NumberEditor,
  StringEditor,
} from ".";

export const EDITORS = {
  string: StringEditor,
  number: NumberEditor,
  enum: EnumEditor,
  timestamp: DateEditor,
  json: JsonEditor,
};
