/* eslint-disable consistent-return */
import guid from 'guid';

/* eslint-disable @typescript-eslint/no-explicit-any */
// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

const config = {
  authenticationMode: 'MasterUser',
  authorityUri: 'https://login.microsoftonline.com/common/v2.0',
  scope: 'https://analysis.windows.net/powerbi/api',
  apiUrl: 'https://api.powerbi.com/',
  clientId: '40d54442-242d-4227-9cfb-94ac641607e5',
  workspaceId: '9ab7f913-45e8-4e73-abf4-33ff01c21f9f',
  reportId: 'c6216fce-c528-4600-b8f0-3510d25b0ce8',
  pbiUsername: 'pbiembed@brunoguimaraescarvalhosgoho.onmicrosoft.com',
  pbiPassword: 'C00asgo@',
  clientSecret: '46yxgLE095Ze.mBsq09BA.5fM4BeLHv0__',
  tenantId: 'cf5d24a3-4e7e-4f83-b3cd-a96390b160af',
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getAuthHeader(accessToken: any) {
  // Function to append Bearer against the Access Token
  // console.log(accessToken);

  return 'Bearer '.concat(accessToken);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line consistent-return
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function validateConfig() {
  // Validation function to check whether the Configurations are available in the config.json file or not

  if (!config.authenticationMode) {
    return 'AuthenticationMode is empty. Please choose MasterUser or ServicePrincipal in config.json.';
  }

  if (
    config.authenticationMode.toLowerCase() !== 'masteruser' &&
    config.authenticationMode.toLowerCase() !== 'serviceprincipal'
  ) {
    return 'AuthenticationMode is wrong. Please choose MasterUser or ServicePrincipal in config.json';
  }

  if (!config.clientId) {
    return 'ClientId is empty. Please register your application as Native app in https://dev.powerbi.com/apps and fill Client Id in config.json.';
  }

  if (!guid.isGuid(config.clientId)) {
    return 'ClientId must be a Guid object. Please register your application as Native app in https://dev.powerbi.com/apps and fill Client Id in config.json.';
  }

  if (!config.reportId) {
    return 'ReportId is empty. Please select a report you own and fill its Id in config.json.';
  }

  if (!guid.isGuid(config.reportId)) {
    return 'ReportId must be a Guid object. Please select a report you own and fill its Id in config.json.';
  }

  if (!config.workspaceId) {
    return 'WorkspaceId is empty. Please select a group you own and fill its Id in config.json.';
  }

  if (!guid.isGuid(config.workspaceId)) {
    return 'WorkspaceId must be a Guid object. Please select a workspace you own and fill its Id in config.json.';
  }

  if (!config.authorityUri) {
    return 'AuthorityUri is empty. Please fill valid AuthorityUri in config.json.';
  }

  if (config.authenticationMode.toLowerCase() === 'masteruser') {
    if (!config.pbiUsername || !config.pbiUsername.trim()) {
      return 'PbiUsername is empty. Please fill Power BI username in config.json.';
    }

    if (!config.pbiPassword || !config.pbiPassword.trim()) {
      return 'PbiPassword is empty. Please fill password of Power BI username in config.json.';
    }
  } else if (config.authenticationMode.toLowerCase() === 'serviceprincipal') {
    if (!config.clientSecret || !config.clientSecret.trim()) {
      return 'ClientSecret is empty. Please fill Power BI ServicePrincipal ClientSecret in config.json.';
    }

    if (!config.tenantId) {
      return 'TenantId is empty. Please fill the TenantId in config.json.';
    }

    if (!guid.isGuid(config.tenantId)) {
      return 'TenantId must be a Guid object. Please select a workspace you own and fill its Id in config.json.';
    }
  }
}
