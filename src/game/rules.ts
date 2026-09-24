import type { CategoryId, ScoreMap } from './types';

// Conta quantas vezes cada face aparece nos dados
function obterFrequencias(dados: number[]): Record<number, number> {
  return dados.reduce((acc, d) => ({ ...acc, [d]: (acc[d] ?? 0) + 1 }), {} as Record<number, number>);
}

function somarDados(dados: number[]): number {
  return dados.reduce((a, b) => a + b, 0);
}

// Verifica se os dados formam uma sequência de 5 consecutivos
function ehSequencia(dados: number[]): boolean {
  const sorted = [...new Set(dados)].sort((a, b) => a - b);
  if (sorted.length < 5) return false;
  const seq1 = [1, 2, 3, 4, 5];
  const seq2 = [2, 3, 4, 5, 6];
  return (
    JSON.stringify(sorted) === JSON.stringify(seq1) ||
    JSON.stringify(sorted) === JSON.stringify(seq2)
  );
}

// Calcula a pontuação possível de uma categoria dado o conjunto de dados
export function calcularPontuacaoCategoria(id: CategoryId, dados: number[]): number {
  if (dados.length === 0) return 0;

  const freq = obterFrequencias(dados);
  const valores = Object.values(freq);
  const total = somarDados(dados);

  switch (id) {
    case 'as':          return dados.filter(d => d === 1).reduce((a, b) => a + b, 0);
    case 'duque':       return dados.filter(d => d === 2).reduce((a, b) => a + b, 0);
    case 'terno':       return dados.filter(d => d === 3).reduce((a, b) => a + b, 0);
    case 'quadra_face': return dados.filter(d => d === 4).reduce((a, b) => a + b, 0);
    case 'quina':       return dados.filter(d => d === 5).reduce((a, b) => a + b, 0);
    case 'sena':        return dados.filter(d => d === 6).reduce((a, b) => a + b, 0);

    // Trinca: pelo menos 3 dados iguais → soma os 5 dados
    case 'trinca':
      return valores.some(v => v >= 3) ? total : 0;

    // Quadra combinação: pelo menos 4 dados iguais → soma os 5 dados
    case 'quadra_comb':
      return valores.some(v => v >= 4) ? total : 0;

    // Full House: trinca + par exato → 25 pontos fixos
    case 'full_house': {
      const hasTriple = valores.some(v => v >= 3);
      const hasPair   = valores.some(v => v === 2);
      // General também não é Full House (precisamos de exatamente 3+2)
      const isGeneral = valores.some(v => v === 5);
      return (hasTriple && hasPair && !isGeneral) ? 25 : 0;
    }

    case 'sequencia':
      return ehSequencia(dados) ? 30 : 0;

    // General: todos os 5 dados iguais → 50 pontos fixos
    case 'general':
      return valores.some(v => v === 5) ? 50 : 0;

    default:
      return 0;
  }
}

// Identifica a melhor combinação especial presente nos dados para exibição
export function identificarCombo(dados: number[]): string | null {
  if (dados.length === 0) return null;
  const freq = obterFrequencias(dados);
  const valores = Object.values(freq);

  if (valores.some(v => v === 5)) return 'General!';
  if (ehSequencia(dados))         return 'Sequência!';

  const hasTriple = valores.some(v => v >= 3);
  const hasPair   = valores.some(v => v === 2);
  if (hasTriple && hasPair)       return 'Full House!';
  if (valores.some(v => v >= 4)) return 'Quadra!';
  if (hasTriple)                  return 'Trinca!';
  return null;
}

// Soma todas as pontuações registradas
export function calcularTotal(scores: ScoreMap): number {
  return Object.values(scores).reduce<number>((acc, v) => acc + (v ?? 0), 0);
}
