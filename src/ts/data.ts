type projectDescriptionType = {
  description: string;
  urlLive: string;
};

export const dataOfProjects: { [key: string]: projectDescriptionType } = {
  "calculadora-de-notas-aw": {
    description:
      "Projeto web que consiste em um calculadora de médias aritméticas e ponderadas. Considera uma média mínima de 60 para informe da situação do aluno.",
    urlLive: "",
  },
  "conversor-de-moedas-aw": {
    description:
      "Projeto web que consiste em um conversor de moedas, beseado na taxa de câmbio atual das mesmas. Obtém essas taxas dinamicamente, a partir da api <a href='https://docs.awesomeapi.com.br/api-de-moedas' target='_blank'>awesomeapi</a>.",
    urlLive: "",
  },
  "imc-calculator-aw": {
    description:
      "Projeto web que consiste em uma calculadora de índice de massa corpórea (IMC). Faz o cálculo baseado no peso e na altura do usuário, e ainda indica sua classificação, baseada no resultado do cálculo.",
    urlLive: "https://imc-calculator-aw.netlify.app/",
  },
  "snake-game": {
    description:
      "Projeto web que consiste no clássico jogo da cobrinha. Todo o jogo é construído com estilo moderno, mas sem perder a essência nostálgica do game.",
    urlLive: "",
  },
  "tasklist-aw": {
    description:
      "Projeto web que consiste em um organizador de tarefas, semelhante a uma todolist. Ele permite gerenciar terafas de maneira intuitiva, e também conta com um sistema de filtros.",
    urlLive: "https://task-list-aw.netlify.app/",
  },
  "tic-tac-aw": {
    description:
      "Projeto web que consiste no clássico jogo da velha. Todo o jogo é construído com estilo moderno, contanto com tooltips, animações e muito mais. Mas tudo isso sem perder a essência nostálgica do game.",
    urlLive: "",
  },
};
