export default class Repository {
    constructor(name, description, urlRepository, urlLive, dateOfCreation, lenguages, size) {
        this.name = name;
        this.description = description;
        this.urlRepository = urlRepository;
        this.urlLive = urlLive;
        this.dateOfCreation = new Date(dateOfCreation);
        this.lenguages = lenguages;
        this.size = size;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getUrlRepository() {
        return this.urlRepository;
    }
    getUrlLive() {
        return this.urlLive;
    }
    getDateOfCreation() {
        return this.dateOfCreation.toLocaleString("pt-br", {});
    }
    getLenguages() {
        return Object.keys(this.lenguages);
    }
    getSize() {
        return `${this.size} MB`;
    }
    toJSON() {
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
    static fromJSON(object) {
        return new Repository(object.name, object.description, object.urlRepository, object.urlLive, object.dateOfCreation, object.lenguages, object.size);
    }
}
