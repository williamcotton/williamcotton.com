/*
 * Language: WebPipe
 * Description: Syntax highlighting for Web Pipe (.wp) files – a declarative HTTP‑pipeline DSL.
 * Author:      Web Pipe Language Team
 */

export default function webpipeHighlight(hljs) {
  /* ────────────────────────────────────────────────────────────
     Reusable tiny modes
     ──────────────────────────────────────────────────────────── */
  const ENV_VAR   = { className: 'variable',  begin: /\$[A-Z_][A-Z0-9_]*/ };
  const FALLBACK  = { className: 'operator',  begin: /\|\|/ };
  const PIPE_OP   = { className: 'operator',  begin: /\|>/ };
  const BOOLEAN   = { className: 'literal',   begin: /\b(?:true|false)\b/ };
  const NUMBER    = hljs.C_NUMBER_MODE;

  /* keys inside `config { … }` blocks                         */
  const CONFIG_KEY = { className: 'attr', begin: /^\s*[A-Za-z_]\w*(?=\s*:)/ };

  /* middleware identifier directly before a colon, e.g. jq:   */
  const MW_NAME    = { className: 'type', begin: /[A-Za-z_]\w*(?=\s*:)/, relevance: 0 };

  /* route paths (/page/:id)                                    */
  const ROUTE = {
    className : 'string',
    begin     : /\/[^\s`]*/,
    returnBegin: true,
    contains  : [{ className: 'variable', begin: /:[A-Za-z_]\w*/ }]
  };

  /* generic back‑tick string                                   */
  const BACKTICK = {
    className: 'string',
    begin: /`/, end: /`/,
    contains: [ ENV_VAR, hljs.BACKSLASH_ESCAPE ]
  };

  /* jq dotted paths (.data.rows[0]) inside jq sub‑language     */
  const JQ_VAR = { className: 'variable', begin: /\.[A-Za-z_]\w*(\[[0-9]+\])?/ };

  /* ────────────────────────────────────────────────────────────
     Embedded sub‑language helpers
     ──────────────────────────────────────────────────────────── */
  function embedded(tag, sub) {
    return { begin: new RegExp(`\\b${tag}:\\s*\``), end: /`/, subLanguage: sub };
  }

  const EMBED_JQ = {
    begin: /\bjq:\s*`/,
    end  : /`/,
    subLanguage: 'json',
    contains: [ JQ_VAR, ENV_VAR, FALLBACK, BOOLEAN, NUMBER ]
  };
  const EMBED_SQL      = embedded('pg',        'sql');
  const EMBED_LUA      = embedded('lua',       'lua');
  const EMBED_MUSTACHE = embedded('mustache',  'xml');   // or 'htmlbars'
  const EMBED_VALIDATE = embedded('validate',  null);    // plain string

  /* ────────────────────────────────────────────────────────────
     Variable assignment (pg foo = `…`)
     ──────────────────────────────────────────────────────────── */
  const ASSIGNMENT = {
    begin: /^\s*(pg|jq|lua|mustache|validate|pipeline)\s+[A-Za-z_]\w*\s*=\s*`/,
    end  : /`/,
    returnBegin: true,
    contains: [
      { className: 'keyword', begin: /\b(?:pg|jq|lua|mustache|validate|pipeline)\b/ },
      { className: 'title',   begin: /[A-Za-z_]\w*/, relevance: 0 },
      EMBED_SQL, EMBED_JQ, EMBED_LUA, EMBED_MUSTACHE, EMBED_VALIDATE
    ]
  };

  /* ────────────────────────────────────────────────────────────
     result blocks
     ──────────────────────────────────────────────────────────── */
  const RESULT_BLOCK = {
    begin: /^\s*\|>\s*result\b/,
    end  : /^\s*(?=\S|$)/,        // until next non‑indented line or EOF
    contains: [
      {
        begin: /^\s*[A-Za-z_]+\(\d+\):/,
        returnBegin: true,
        contains: [
          { className: 'title',  begin: /[A-Za-z_]+/ },
          { className: 'number', begin: /\d+/ }
        ]
      },
      PIPE_OP, EMBED_SQL, EMBED_JQ, EMBED_LUA, EMBED_MUSTACHE, EMBED_VALIDATE,
      BACKTICK, ROUTE, ENV_VAR, BOOLEAN, NUMBER, FALLBACK,
      hljs.HASH_COMMENT_MODE
    ]
  };

  /* ────────────────────────────────────────────────────────────
     Main grammar export
     ──────────────────────────────────────────────────────────── */
  return {
    name: 'WebPipe',
    aliases: ['wp'],
    contains: [
      /* comments */
      hljs.HASH_COMMENT_MODE,

      /* HTTP verbs at start of route lines */
      { className: 'keyword', begin: /\b(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/ },

      /* core reserved words */
      { className: 'keyword', begin: /\b(config|pipeline|result)\b/ },

      /* operator and middleware name */
      PIPE_OP,
      MW_NAME,                // <‑‑ ensures `jq:`, `pg:` etc. are highlighted
      ROUTE,

      /* variable assignment blocks */
      ASSIGNMENT,

      /* embedded language blocks (inline pipelines) */
      EMBED_SQL, EMBED_JQ, EMBED_LUA, EMBED_MUSTACHE, EMBED_VALIDATE,

      /* config pg { … } blocks */
      {
        begin: /^\s*config\s+[A-Za-z_]\w*\s*\{/,
        end  : /\}/,
        keywords: 'config',
        contains: [
          { className: 'keyword', begin: /\bconfig\b/ },
          { className: 'type',    begin: /\b[A-Za-z_]\w*(?=\s*\{)/ },
          hljs.HASH_COMMENT_MODE,
          CONFIG_KEY, ENV_VAR, FALLBACK, BOOLEAN, NUMBER,
          BACKTICK, hljs.QUOTE_STRING_MODE
        ]
      },

      /* result blocks */
      RESULT_BLOCK,

      /* primitives that can appear almost anywhere */
      ENV_VAR, FALLBACK, BOOLEAN, NUMBER, BACKTICK
    ]
  };
}
