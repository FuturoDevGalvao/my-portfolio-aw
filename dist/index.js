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
import { saveRepositoriesInLocalStorage } from "./api.js";
const descriptionOfProjects = {
    "calculadora-de-notas-aw": "Projeto web que consiste em um calculadora de médias aritméticas e ponderadas. Considera uma média mínima de 60 para informe da situação do aluno.",
    "conversor-de-moedas-aw": "Projeto web que consiste em um conversor de moedas, beseado na taxa de câmbio atual das mesmas. Obtém essas taxas dinamicamente, a partir da api <a href='https://docs.awesomeapi.com.br/api-de-moedas' target='_blank'>awesomeapi</a>",
    "imc-calculator-aw": "Projeto web que consiste em uma calculadora de índice de massa corpórea (IMC). Faz o cálculo baseado no peso e na altura do usuário, e ainda indica sua classificação, baseada no resultado do cálculo",
    "snake-game": "Projeto web que consiste no clássico jogo da cobrinha. Todo o jogo é construído com estilo moderno, mas sem perder a essência nostálgica do game.",
    "tasklist-aw": "Projeto web que consiste em um organizador de tarefas, semelhante a uma todolist. Ele permite gerenciar terafas de maneira intuitiva, e também conta com um sistema de filtros.",
    "tic-tac-aw": "Projeto web que consiste no clássico jogo da velha. Todo o jogo é construído com estilo moderno, contanto com tooltips, animações e muito mais. Mas tudo isso sem perder a essência nostálgica do game.",
};
const localStorageIsEmpty = () => {
    return localStorage.length === 0;
};
const getRepositoriesFromLocalStorage = () => {
    const repositories = [];
    const repositoriesInStringFormat = localStorage.getItem("repositories");
    const repositoriesInJsonFormat = JSON.parse(repositoriesInStringFormat);
    for (const key in repositoriesInJsonFormat) {
        repositories.push(Repository.fromJSON(repositoriesInJsonFormat[key]));
    }
    return repositories;
};
const createRepositoriesDOM = () => {
    try {
        const repositories = getRepositoriesFromLocalStorage();
        if (repositories) {
            const repositoriesDOM = repositories.map((repos) => `
        <div class="project">
          <i class="fa-solid fa-circle dot"></i>
          <div class="header-project">
            <h2>🚀${repos.getName()}</h2>
          </div>
          <div class="body-project">
            <div class="description">
              ${descriptionOfProjects[repos.getName()]}
            </div>
          </div>
        </div>`);
            const projectsList = document.querySelector(".projects-list");
            projectsList.innerHTML = "";
            repositoriesDOM.forEach((repos) => (projectsList.innerHTML += repos));
            addListenerInProjectDOMElement();
        }
    }
    catch (error) {
        console.error(error);
        throw error; // propaga na stack
    }
};
const getRepositoryFromName = (nameOfRepository) => {
    const repositories = getRepositoriesFromLocalStorage();
    return repositories.find((repos) => repos.getName() === nameOfRepository);
};
const addListenerInProjectDOMElement = () => {
    const projects = document.querySelectorAll(".project");
    projects.forEach((project) => {
        project.addEventListener("click", (event) => {
            var _a;
            const projectClicked = event.currentTarget;
            const nameOfProject = (_a = projectClicked
                .querySelector(".header-project")
                .textContent) === null || _a === void 0 ? void 0 : _a.trim().slice(2);
            const repository = getRepositoryFromName(nameOfProject);
            showPreviewOfRepositoryClicked(repository);
        });
    });
};
const getDescriptionOfProjectDOMElement = (nameOfRepository) => {
    const projects = document.querySelectorAll(".project");
    return Array.from(projects)
        .find((p) => {
        const nameOfProject = p
            .querySelector(".header-project")
            .querySelector("h2").textContent;
        return nameOfProject.slice(2) === nameOfRepository;
    })
        .querySelector(".body-project").innerHTML;
};
const getSrcOfImgBasedOfLenguage = (lenguage) => {
    const lenguages = {
        HTML: "./assets/devicon--html5.svg",
        CSS: "./assets/devicon--css3.svg",
        JavaScript: "./assets/logos--javascript.svg",
    };
    return lenguages[lenguage];
};
const showPreviewOfRepositoryClicked = (repository) => {
    const projectPreview = document.querySelector(".project-preview");
    projectPreview.classList.remove("project-preview-empty");
    const nameOfprojectInProjectPreview = projectPreview
        .querySelector(".header-project-preview")
        .querySelector("#name");
    const descriptionOfProjectInProjectPreview = projectPreview
        .querySelector(".body-project-preview")
        .querySelector("#description");
    const lenguagesOfProjectInProjectPreview = projectPreview
        .querySelector(".body-project-preview")
        .querySelector("#lenguages");
    const linksOfProjectInProjectPreview = projectPreview
        .querySelector(".body-project-preview")
        .querySelector(".links");
    nameOfprojectInProjectPreview.textContent = repository.getName();
    descriptionOfProjectInProjectPreview.innerHTML =
        getDescriptionOfProjectDOMElement(repository.getName());
    lenguagesOfProjectInProjectPreview.innerHTML = "";
    repository
        .getLenguages()
        .map((l) => `<li><img src="${getSrcOfImgBasedOfLenguage(l)}" /></li>`)
        .forEach((l) => (lenguagesOfProjectInProjectPreview.innerHTML += l));
    projectPreview.classList.remove("project-preview-empty");
};
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const btnToAboutMe = document.getElementById("btn-to-about-me");
    btnToAboutMe === null || btnToAboutMe === void 0 ? void 0 : btnToAboutMe.addEventListener("mouseover", () => {
        btnToAboutMe.classList.remove("btn-to-about-me-floating");
    });
    btnToAboutMe === null || btnToAboutMe === void 0 ? void 0 : btnToAboutMe.addEventListener("mouseout", () => {
        btnToAboutMe.classList.add("btn-to-about-me-floating");
    });
    if (localStorageIsEmpty())
        yield saveRepositoriesInLocalStorage();
    createRepositoriesDOM();
});
