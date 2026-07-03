/**
 * api-gateway routes /api/v1/<service>/** to each service with StripPrefix=2,
 * and each service has its own server.servlet.context-path (/account,
 * /workspace, /intelligence) that reappears after stripping -- so every
 * client-facing path needs this prefix, not just the bare controller path.
 * Source: distributed-lovable-clone-config-server's gateway route config.
 */
export const GATEWAY = {
  account: '/api/v1/account',
  workspace: '/api/v1/workspace',
  intelligence: '/api/v1/intelligence',
} as const;
