import Repository from "./Repository.js";
import { saveRepositoriesInLocalStorage } from "./api.js";

const localStorageIsEmpty = (): boolean => {
  return localStorage.length === 0;
};

const getRepositoriesFromLocalStorage = (): Repository[] | null => {
  const repositories: Repository[] = [];

  const repositoriesInStringFormat: string = localStorage.getItem("repositories");

  const repositoriesInJsonFormat = JSON.parse(repositoriesInStringFormat);

  for (const key in repositoriesInJsonFormat) {
    repositories.push(Repository.fromJSON(repositoriesInJsonFormat[key]));
  }

  return repositories;
};

const createRepositoriesDOM = (): void => {
  try {
    const repositories = getRepositoriesFromLocalStorage();

    if (repositories) {
      const repositoriesDOM = repositories.map(
        (repos) => `
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
        </div>`
      );

      const projectsList: HTMLElement = document.querySelector(".projects-list");
      projectsList.innerHTML = "";
      repositoriesDOM.forEach((repos) => (projectsList.innerHTML += repos));
      addListenerInProjectDOMElement();
    }
  } catch (error) {
    console.error(error);
    throw error; // propaga na stack
  }
};

const getRepositoryFromName = (nameOfRepository: string): Repository => {
  const repositories = getRepositoriesFromLocalStorage();
  return repositories.find((repos) => repos.getName() === nameOfRepository);
};

const addListenerInProjectDOMElement = () => {
  const projects = document.querySelectorAll(".project");

  projects.forEach((project) => {
    project.addEventListener("click", (event) => {
      const projectClicked = event.currentTarget as HTMLElement;

      const nameOfProject = projectClicked.querySelector(".header-project").textContent?.trim().slice(2);

      const repository = getRepositoryFromName(nameOfProject);
      showPreviewOfRepositoryClicked(repository);
    });
  });
};

const getDescriptionOfProjectDOM = (nameOfRepository: string) => {
  const projects = document.querySelectorAll(".project");

  return Array.from(projects)
    .find((p) => {
      const nameOfProject = p.querySelector(".header-project").querySelector("h2").textContent;

      return nameOfProject.slice(2) === nameOfRepository;
    })
    .querySelector(".body-project").innerHTML;
};

const getSrcOfImgBasedOfLenguage = (lenguage: string): string => {
  const lenguages: {
    [key: string]: string;
  } = {
    HTML: "./assets/devicon--html5.svg",
    CSS: "./assets/devicon--css3.svg",
    JavaScript: "./assets/logos--javascript.svg",
  };

  return lenguages[lenguage];
};

const getProjectPreviewElements = () => {
  const projectPreview: HTMLElement = document.querySelector(".project-preview");

  projectPreview.classList.remove("project-preview-empty");

  const headerProjectPreview = projectPreview.querySelector(".header-project-preview");

  const nameOfprojectInProjectPreview: HTMLElement = headerProjectPreview.querySelector("#name");

  const descriptionOfProjectInProjectPreview: HTMLElement = projectPreview
    .querySelector(".body-project-preview")
    .querySelector("#description");

  const lenguagesOfProjectInProjectPreview: HTMLElement = projectPreview
    .querySelector(".body-project-preview")
    .querySelector("#lenguages");

  const linksOfProjectInProjectPreview: HTMLElement = projectPreview
    .querySelector(".body-project-preview")
    .querySelector(".links");

  const urlLiveInProjectPreview: any = linksOfProjectInProjectPreview.querySelector("#url-live");

  const urlRepositoryInProjectPreview: any = linksOfProjectInProjectPreview.querySelector("#url-repository");

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

const showPreviewOfRepositoryClicked = (repository: Repository) => {
  const {
    projectPreview,
    headerProjectPreview,
    nameOfprojectInProjectPreview,
    descriptionOfProjectInProjectPreview,
    lenguagesOfProjectInProjectPreview,
    urlLiveInProjectPreview,
    urlRepositoryInProjectPreview,
  } = getProjectPreviewElements();

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
  (
    headerProjectPreview as HTMLElement
  ).style.backgroundImage = `linear-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.8)), url("../../assets/${repository.getName()}.png")`;
};

const showBtnBackToTop = () => {
  const btnBackToTop: HTMLElement = document.getElementById("btn-back-to-top");

  if (window.scrollY > 500) {
    btnBackToTop.classList.add("show-btn-back-to-top");
  } else {
    btnBackToTop.classList.remove("show-btn-back-to-top");
  }
};

const addListenerInBtnToAboutMe = () => {
  const btnToAboutMe = document.getElementById("btn-to-about-me");

  btnToAboutMe?.addEventListener("mouseover", () => {
    btnToAboutMe.classList.remove("btn-to-about-me-floating");
  });

  btnToAboutMe?.addEventListener("mouseout", () => {
    btnToAboutMe.classList.add("btn-to-about-me-floating");
  });
};

const preventEventDefaulOfLinks = () => {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (event) {
      if (!this.getAttribute("href") || this.getAttribute("href") === "#") {
        event.preventDefault();
      }
    });
  });
};

window.onload = async () => {
  if (localStorageIsEmpty()) await saveRepositoriesInLocalStorage();
  createRepositoriesDOM();
  preventEventDefaulOfLinks();
  window.addEventListener("scroll", showBtnBackToTop);
  addListenerInBtnToAboutMe();
};
