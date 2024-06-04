export default class Repository {
  private name: string;
  private description: string;
  private urlRepository: string;
  private urlLive: string;
  private dateOfCreation: Date;
  private lenguages: object;
  private size: number;

  constructor(
    name: string,
    description: string,
    urlRepository: string,
    urlLive: string,
    dateOfCreation: string,
    lenguages: object,
    size: number
  ) {
    this.name = name;
    this.description = description;
    this.urlRepository = urlRepository;
    this.urlLive = urlLive;
    this.dateOfCreation = new Date(dateOfCreation);
    this.lenguages = lenguages;
    this.size = size;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getUrlRepository(): string {
    return this.urlRepository;
  }

  public getUrlLive(): string {
    return this.urlLive;
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
      description: this.description,
      urlRepository: this.urlRepository,
      urlLive: this.urlLive,
      dateOfCreation: this.dateOfCreation,
      lenguages: this.lenguages,
      size: this.size,
    };
  }

  public static fromJSON(object: any) {
    return new Repository(
      object.name,
      object.description,
      object.urlRepository,
      object.urlLive,
      object.dateOfCreation,
      object.lenguages,
      object.size
    );
  }
}
