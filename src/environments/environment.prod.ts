export const environment = {
  production: true,
 apiUrl: 'https://api-celesc.grupofloripark.com.br/api-celesc',
 tokenWhitelistedDomains: [new RegExp('https://api-celesc.grupofloripark.com.br')],
 tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
