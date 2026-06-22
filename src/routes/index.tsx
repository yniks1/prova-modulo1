import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, GraduationCap, ArrowRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prova de Treinamento" },
      { name: "description", content: "Página interativa de prova." },
    ],
  }),
  component: QuizPage,
});

type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  {
    prompt: "O que define corretamente o serviço de Assistência 24 horas?",
    options: [
      "Um serviço exclusivo de mecânica disponível em horário comercial.",
      "Um serviço de suporte disponível em tempo integral, destinado a atender situações emergenciais relacionadas ao veículo.",
      "Um sistema de reembolso de despesas de viagem.",
      "Uma central de negociação de dívidas veiculares."
    ],
    correctIndex: 1,
  },
  {
    prompt: "No acionamento do serviço de \"Troca de Pneus\", qual é a responsabilidade da Assistência?",
    options: [
      "Fornecer um pneu novo caso o estepe esteja danificado.",
      "Enviar um borracheiro para consertar o pneu no local.",
      "Apenas a mão de obra para realizar a troca do pneu danificado, sendo todas as ferramentas necessárias de responsabilidade do associado.",
      "Rebocar o veículo imediatamente para o borracheiro mais próximo."
    ],
    correctIndex: 2,
  },
  {
    prompt: "Sobre o serviço de \"Chaveiro\", qual é a principal característica de atendimento?",
    options: [
      "O serviço não está disponível fora do horário comercial.",
      "O serviço contempla exclusivamente a abertura da porta principal do veículo, não realizando abertura de porta-malas.",
      "O chaveiro só atende casos de quebra da chave na ignição.",
      "O custo da confecção da chave é sempre coberto de forma integral, sem limite."
    ],
    correctIndex: 1,
  },
  {
    prompt: "Na utilização do \"Envio de Combustível\", de quem é a responsabilidade pelos custos extras?",
    options: [
      "A assistência paga o combustível até o limite de R$ 50,00.",
      "O associado deverá arcar com os custos do combustível fornecido e do recipiente utilizado.",
      "O prestador de serviço deve fornecer 5 litros gratuitamente.",
      "O custo é repassado integralmente para a associação parceira."
    ],
    correctIndex: 1,
  },
  {
    prompt: "Quando o serviço de \"Hospedagem\" é disponibilizado ao associado?",
    options: [
      "Sempre que o associado viaja para fora de seu estado.",
      "Apenas em casos de furto ou roubo do veículo.",
      "Quando não há possibilidade de retorno imediato dos ocupantes do veículo à para o endereço de residência cadastrado na Central de Atendimento.",
      "Quando o tmepo de espera ultrapassa a prévia de 2 horas."
    ],
    correctIndex: 2,
  },
  {
    prompt: "Para a liberação dos serviços de Táxi e MTA (Meio de Transporte Alternativo), qual é a condição obrigatória?",
    options: [
      "O cliente estar viajando com a família.",
      "A ocorrência ser exclusivamente uma pane elétrica.",
      "Quando houver a utilização do serviço de reboque para a remoção do veículo cadastrado.",
      "O local do evento ser fora da cidade de origem."
    ],
    correctIndex: 2,
  }
];

function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[current];
  const answered = selected !== null;
  const isCorrect = answered && selected === question.correctIndex;
  const total = QUESTIONS.length;
  const score = answers.reduce((acc, a, i) => acc + (a === QUESTIONS[i].correctIndex ? 1 : 0), 0);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (current + 1 >= total) setFinished(true);
    else { setCurrent(current + 1); setSelected(null); }
  };

  const handleRestart = () => { setCurrent(0); setSelected(null); setAnswers([]); setFinished(false); };

  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-200 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center gap-3 text-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
          <GraduationCap className="h-6 w-6 text-slate-900" />
           </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-800">
              Treinamento
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl text-slate-900">Prova Modulo 1 - Assistme</h1>
          </div>
        </header>


         {finished ? (
             <section className="rounded-3xl bg-white border-t-4 border-t-orange-500 p-6 shadow-[var(--shadow-soft)] sm:p-10">            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-accent)] shadow-[var(--shadow-soft)]">
              <Trophy className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Prova concluída!
            </h2>
            <p className="mt-2 text-muted-foreground">Confira seu desempenho abaixo.</p>
            <p className="mt-6 text-5xl font-extrabold text-[var(--brand-blue-deep)]">
              {score}<span className="text-2xl text-muted-foreground">/{total}</span>
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--brand-orange)]">
              {Math.round((score / total) * 100)}% de aproveitamento
            </p>

            <ul className="mt-8 space-y-2 text-left">
              {QUESTIONS.map((q, i) => {
                const ok = answers[i] === q.correctIndex;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-3"
                  >
                    {ok ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--brand-blue)]" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                    )}
                    <span className="text-sm text-foreground">
                      <strong>Questão {String(i + 1).padStart(2, "0")}:</strong>{" "}
                      {ok
                        ? "correta"
                        : `incorreta (correta: ${String.fromCharCode(65 + q.correctIndex)})`}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex justify-center w-full">
            <button
              onClick={handleRestart}
             
             className="inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-500 hover:bg-orange-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105"
             >
             <RotateCcw className="h-6 w-6" />
              Refazer prova
              </button>
              </div>
          </section>
        ) : (
          <section className="rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] sm:p-10">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-[oklch(0.45_0.18_255/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand-blue-deep)]">
                Questão {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Escolha apenas uma alternativa
              </span>
            </div>

          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${((current + 1) / total) * 100}%` }}
                 />
              </div>

            <h2 className="mb-8 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              {question.prompt}
            </h2>

            <ul className="space-y-3">
              {question.options.map((opt, i) => {
                const isSel = selected === i;
                const isRight = i === question.correctIndex;
                const showRight = answered && isRight;
                const showWrong = answered && isSel && !isRight;

                return (
                  <li key={i}>
                    <button
                      type="button"
                      disabled={answered}
                      onClick={() => setSelected(i)}
                      className={[
                        "group flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all",
                        "disabled:cursor-not-allowed",
                        showRight
                          ? "border-[var(--brand-blue)] bg-[oklch(0.45_0.18_255/0.08)]"
                          : showWrong
                          ? "border-[var(--brand-orange)] bg-[oklch(0.72_0.18_55/0.08)]"
                          : answered
                          ? "border-border bg-white opacity-60"
                          : "border-border bg-white hover:border-[var(--brand-orange)] hover:shadow-[var(--shadow-glow)]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors",
                          showRight
                            ? "bg-[var(--brand-blue)] text-white"
                            : showWrong
                            ? "bg-[var(--brand-orange)] text-white"
                            : "bg-secondary text-foreground group-hover:bg-[var(--brand-orange)] group-hover:text-white",
                        ].join(" ")}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-base font-medium text-foreground">
                        {opt}
                      </span>
                      {showRight && <CheckCircle2 className="h-6 w-6 text-[var(--brand-blue)]" />}
                      {showWrong && <XCircle className="h-6 w-6 text-[var(--brand-orange)]" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            {answered && (
              <div
                className={[
                  "mt-8 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between",
                  isCorrect
                    ? "bg-[oklch(0.45_0.18_255/0.08)] text-[var(--brand-blue-deep)]"
                    : "bg-[oklch(0.72_0.18_55/0.1)] text-[oklch(0.4_0.14_50)]",
                ].join(" ")}
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {isCorrect ? "Resposta correta!" : "Resposta incorreta"}
                  </p>
                  <p className="mt-1 text-sm opacity-90">
                    {isCorrect
                      ? "Excelente! Você acertou a questão."
                      : `A alternativa correta é a letra ${String.fromCharCode(
                          65 + question.correctIndex,
                        )}.`}
                  </p>
                </div>
                  <button
                    onClick={handleNext} 
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-accent)] px-5 py-3 text-sm font-semibold text-slate-900 shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]"
                   >
                  {current + 1 >= total ? "Finalizar" : "Próxima questão"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>
        )}

        <p className="mt-6 text-center text-base text-slate-900">
          Desenvolvido por Yago | Setor de Qualidade
        </p>
      </div>
    </main>
  );
}
