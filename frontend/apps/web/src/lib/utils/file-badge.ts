const EXT_META: Record<string, { label: string; color: string }> = {
  tsx: { label: 'TSX', color: '#D9740A' },
  ts: { label: 'TS', color: '#2557D5' },
  css: { label: 'CSS', color: '#D6469B' },
  json: { label: '{ }', color: '#B98900' },
  html: { label: 'HTM', color: '#C2540A' },
  svg: { label: 'SVG', color: '#7A4FD1' },
  ico: { label: 'ICO', color: '#1F8A5B' },
  txt: { label: 'TXT', color: '#8A8A92' },
  md: { label: 'MD', color: '#6B6B78' },
  js: { label: 'JS', color: '#B98900' },
  jsx: { label: 'JSX', color: '#D9740A' },
  gitignore: { label: 'GIT', color: '#8A8A92' },
  yml: { label: 'YML', color: '#8A8A92' },
  yaml: { label: 'YML', color: '#8A8A92' },
};

export function getFileExtension(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? name.toLowerCase() : name.slice(dot + 1).toLowerCase();
}

export function getFileBadge(name: string): { label: string; color: string } {
  const ext = getFileExtension(name);
  return EXT_META[ext] ?? { label: ext.slice(0, 3).toUpperCase() || '?', color: '#9A9AA0' };
}

const EXT_TO_SHIKI_LANG: Record<string, string> = {
  tsx: 'tsx',
  ts: 'typescript',
  jsx: 'jsx',
  js: 'javascript',
  css: 'css',
  html: 'html',
  json: 'json',
  md: 'markdown',
  yml: 'yaml',
  yaml: 'yaml',
  svg: 'xml',
};

export function getShikiLang(name: string): string {
  return EXT_TO_SHIKI_LANG[getFileExtension(name)] ?? 'text';
}
