export enum PolicyTypeEnum {
  Undefined = 0,
  General = 1,
  Reservation = 2,
  Cancellation = 3,
}

export enum UserTypeEnum {
  Valet_Parking = 3,
  Server = 4,
  DJ = 5,
  Hookah_Waitress = 7,
  Waitress = 10,
  Customer = 6,
  Security = 9,
  Manager = 11,
}

export enum IdTypeEnum {
  DriversLicense = 1,
  Passport = 2,
  IdentityCard = 3,
}

export enum TableStatusEnum {
  Undefined = 0,

  Available = 1,
  HoldOn = 5,
  Reserved = 10,
  OnUse = 15,
}

export enum UserSettingTypeEnum {
  Undefined = 0,

  MessagesByEmail = 1,
  MessagesBySms = 2,
  RemindersByEmail = 3,
  RemindersBySms = 4,
}

export enum PaymentMethodEnum {
  Undefined = 0,

  Cash = 10,
  CreditCard = 20,
}
