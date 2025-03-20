export class Helper {
  static formatDate(language: string, date: Date) {
    return new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  }
}
