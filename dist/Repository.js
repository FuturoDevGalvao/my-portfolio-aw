export default class Repository {
    constructor(name, url, dateOfCreation, lenguages, size) {
        this.name = name;
        this.url = url;
        this.dateOfCreation = new Date(dateOfCreation);
        this.lenguages = lenguages;
        this.size = size;
    }
    getName() {
        return this.name;
    }
    getUrl() {
        return this.url;
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
            url: this.url,
            dateOfCreation: this.dateOfCreation,
            lenguages: this.lenguages,
            size: this.size,
        };
    }
    static fromJSON(object) {
        return new Repository(object.name, object.url, object.dateOfCreation, object.lenguages, object.size);
    }
}
