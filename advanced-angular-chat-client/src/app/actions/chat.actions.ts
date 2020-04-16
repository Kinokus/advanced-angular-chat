export class GetLatestMessages {
  static readonly type = '[Chat] Get Latest Messages';
  constructor(public count: number) {
  }
}
