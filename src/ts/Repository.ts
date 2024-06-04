export default class Repository {
  private name: string;
  private url: string;
  private dateOfCreation: Date;
  private lenguages: object;
  private size: number;

  constructor(
    name: string,
    url: string,
    dateOfCreation: string,
    lenguages: object,
    size: number
  ) {
    this.name = name;
    this.url = url;
    this.dateOfCreation = new Date(dateOfCreation);
    this.lenguages = lenguages;
    this.size = size;
  }

  public getName(): string {
    return this.name;
  }

  public getUrl(): string {
    return this.url;
  }

  public getDateOfCreation(): string {
    return this.dateOfCreation.toLocaleString("pt-br", {});
  }

  public getLenguages(): string[] {
    return Object.keys(this.lenguages);
  }

  public getSize(): string {
    return `${this.size} MB`;
  }

  public toJSON() {
    return {
      name: this.name,
      url: this.url,
      dateOfCreation: this.dateOfCreation,
      lenguages: this.lenguages,
      size: this.size,
    };
  }

  public static fromJSON(object: any) {
    return new Repository(
      object.name,
      object.url,
      object.dateOfCreation,
      object.lenguages,
      object.size
    );
  }
}
