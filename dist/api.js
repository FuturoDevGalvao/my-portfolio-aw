var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Repository from "./Repository.js";
const getRepositoriesFromGitHub = () => __awaiter(void 0, void 0, void 0, function* () {
    const URL = "https://api.github.com/users/FuturoDevGalvao/repos";
    try {
        const response = yield fetch(URL);
        if (!response.ok)
            throw new Error(`HTTP ERROR! STATUS CODE: ${response.status}`);
        return yield response.json();
    }
    catch (error) {
        console.log(error);
        throw error; // propaga na stack
    }
});
const getLenguagesOfRepositories = (repository) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = repository.languages_url;
    try {
        const response = yield fetch(URL);
        if (!response.ok)
            throw new Error(`HTTP ERROR! STATUS CODE: ${response.status}`);
        return yield response.json();
    }
    catch (error) {
        console.log(error);
        throw error; // propaga na stack
    }
});
const filterRepositories = (repositories) => {
    const nameOfRepositoriesAccepted = [
        "calculadora-de-notas-aw",
        "conversor-de-moedas-aw",
        "imc-calculator-aw",
        "snake-game",
        "tasklist-aw",
        "tic-tac-aw",
    ];
    const repositoriesFiltred = repositories.filter((repos) => nameOfRepositoriesAccepted.includes(repos.name));
    return repositoriesFiltred;
};
const createRepository = (repository) => __awaiter(void 0, void 0, void 0, function* () {
    const lenguagesOfRepository = yield getLenguagesOfRepositories(repository);
    return new Repository(repository.name, repository.url, repository.created_at, lenguagesOfRepository, repository.size);
});
export const saveRepositoriesInLocalStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getRepositoriesFromGitHub();
        const dataFiltred = filterRepositories(data);
        // Usando map para criar as promessas de criação dos repositórios
        const repositoryPromises = dataFiltred.map((df) => __awaiter(void 0, void 0, void 0, function* () { return yield createRepository(df); }));
        // Usando Promise.all para aguardar todas as promessas serem resolvidas
        const repositories = yield Promise.all(repositoryPromises);
        localStorage.clear();
        localStorage.setItem("repositories", JSON.stringify(repositories.map((repo) => repo.toJSON())));
    }
    catch (error) {
        console.error(error);
        throw error; // propaga na stack
    }
});
