export class NotificationModel {
  id!: string;
  type!: AlertType;
  message!: string;
  autoClose!: boolean;
  keepAfterRouteChange!: boolean;
  fade!: boolean;

  constructor(init?: Partial<NotificationModel>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
