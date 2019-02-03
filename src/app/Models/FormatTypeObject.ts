export class FormatTypeObject {
  abbr:                null | string;
  Issuer:              null | string;
  IINRange:            number[] | null;
  IINMetaRangeStart:   number;
  IINMetaRangeEnd:     number;
  LengthOfDigits:      number[] | null;
  DisplayFormat:       null | string;
  FormatLength?:       number;
  DigitSpacingFormat?: string;
}
