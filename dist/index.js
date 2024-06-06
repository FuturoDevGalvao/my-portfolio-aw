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
              ${repos.getDescription()}
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
            const nameOfProject = (_a = projectClicked.querySelector(".header-project").textContent) === null || _a === void 0 ? void 0 : _a.trim().slice(2);
            const repository = getRepositoryFromName(nameOfProject);
            showPreviewOfRepositoryClicked(repository);
        });
    });
};
const getDescriptionOfProjectDOM = (nameOfRepository) => {
    const projects = document.querySelectorAll(".project");
    return Array.from(projects)
        .find((p) => {
        const nameOfProject = p.querySelector(".header-project").querySelector("h2").textContent;
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
const getProjectPreviewElements = () => {
    const projectPreview = document.querySelector(".project-preview");
    projectPreview.classList.remove("project-preview-empty");
    const headerProjectPreview = projectPreview.querySelector(".header-project-preview");
    const nameOfprojectInProjectPreview = headerProjectPreview.querySelector("#name");
    const descriptionOfProjectInProjectPreview = projectPreview
        .querySelector(".body-project-preview")
        .querySelector("#description");
    const lenguagesOfProjectInProjectPreview = projectPreview
        .querySelector(".body-project-preview")
        .querySelector("#lenguages");
    const linksOfProjectInProjectPreview = projectPreview
        .querySelector(".body-project-preview")
        .querySelector(".links");
    const urlLiveInProjectPreview = linksOfProjectInProjectPreview.querySelector("#url-live");
    const urlRepositoryInProjectPreview = linksOfProjectInProjectPreview.querySelector("#url-repository");
    return {
        projectPreview,
        headerProjectPreview,
        nameOfprojectInProjectPreview,
        descriptionOfProjectInProjectPreview,
        lenguagesOfProjectInProjectPreview,
        urlLiveInProjectPreview,
        urlRepositoryInProjectPreview,
    };
};
const showPreviewOfRepositoryClicked = (repository) => {
    const { projectPreview, headerProjectPreview, nameOfprojectInProjectPreview, descriptionOfProjectInProjectPreview, lenguagesOfProjectInProjectPreview, urlLiveInProjectPreview, urlRepositoryInProjectPreview, } = getProjectPreviewElements();
    nameOfprojectInProjectPreview.textContent = repository.getName();
    descriptionOfProjectInProjectPreview.innerHTML = getDescriptionOfProjectDOM(repository.getName());
    lenguagesOfProjectInProjectPreview.innerHTML = "";
    repository
        .getLenguages()
        .map((l) => `<li><img src="${getSrcOfImgBasedOfLenguage(l)}" /></li>`)
        .forEach((l) => (lenguagesOfProjectInProjectPreview.innerHTML += l));
    urlLiveInProjectPreview.href = repository.getUrlLive() === "" ? "#" : repository.getUrlLive();
    urlRepositoryInProjectPreview.href = repository.getUrlRepository();
    projectPreview.classList.remove("project-preview-empty");
    headerProjectPreview.style.backgroundImage = `linear-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.8)), url("../../assets/${repository.getName()}.png")`;
};
const showBtnBackToTop = () => {
    const btnBackToTop = document.getElementById("btn-back-to-top");
    if (window.scrollY > 500) {
        btnBackToTop.classList.add("show-btn-back-to-top");
    }
    else {
        btnBackToTop.classList.remove("show-btn-back-to-top");
    }
};
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const btnToAboutMe = document.getElementById("btn-to-about-me");
    btnToAboutMe === null || btnToAboutMe === void 0 ? void 0 : btnToAboutMe.addEventListener("mouseover", () => {
        btnToAboutMe.classList.remove("btn-to-about-me-floating");
    });
    btnToAboutMe === null || btnToAboutMe === void 0 ? void 0 : btnToAboutMe.addEventListener("mouseout", () => {
        btnToAboutMe.classList.add("btn-to-about-me-floating");
    });
    window.addEventListener("scroll", showBtnBackToTop);
    if (localStorageIsEmpty())
        yield saveRepositoriesInLocalStorage();
    showBtnBackToTop();
    createRepositoriesDOM();
});
