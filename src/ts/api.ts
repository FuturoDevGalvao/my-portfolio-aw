import Repository from "./Repository.js";

const getRepositoriesFromGitHub = async (): Promise<any> => {
  const URL: string = "https://api.github.com/users/FuturoDevGalvao/repos";

  try {
    const response: Response = await fetch(URL);

    if (!response.ok)
      throw new Error(`HTTP ERROR! STATUS CODE: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error; // propaga na stack
  }
};

const getLenguagesOfRepositories = async (repository: any): Promise<any> => {
  const URL: string = repository.languages_url;

  try {
    const response: Response = await fetch(URL);

    if (!response.ok)
      throw new Error(`HTTP ERROR! STATUS CODE: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error; // propaga na stack
  }
};

const filterRepositories = (repositories: object[]): object[] => {
  const nameOfRepositoriesAccepted: string[] = [
    "calculadora-de-notas-aw",
    "conversor-de-moedas-aw",
    "imc-calculator-aw",
    "snake-game",
    "tasklist-aw",
    "tic-tac-aw",
  ];

  const repositoriesFiltred: object[] = repositories.filter((repos: any) =>
    nameOfRepositoriesAccepted.includes(repos.name)
  );

  return repositoriesFiltred;
};

const createRepository = async (repository: any): Promise<Repository> => {
  const lenguagesOfRepository = await getLenguagesOfRepositories(repository);

  return new Repository(
    repository.name,
    repository.url,
    repository.created_at,
    lenguagesOfRepository,
    repository.size
  );
};

export const saveRepositoriesInLocalStorage = async (): Promise<void> => {
  try {
    const data = await getRepositoriesFromGitHub();
    const dataFiltred = filterRepositories(data);

    // Usando map para criar as promessas de criação dos repositórios
    const repositoryPromises = dataFiltred.map(
      async (df) => await createRepository(df)
    );

    // Usando Promise.all para aguardar todas as promessas serem resolvidas
    const repositories = await Promise.all(repositoryPromises);

    localStorage.clear();

    localStorage.setItem(
      "repositories",
      JSON.stringify(repositories.map((repo) => repo.toJSON()))
    );
  } catch (error) {
    console.error(error);
    throw error; // propaga na stack
  }
};
