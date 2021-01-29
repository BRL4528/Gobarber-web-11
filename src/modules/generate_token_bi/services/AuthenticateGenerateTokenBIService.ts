/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-prototype-builtins */
import adal from 'adal-node';
import fetch from 'node-fetch';

import { getAuthHeader } from './utils';
import PowerBiReportDetails from '../infra/models/embedReportConfig';
import EmbedConfig from '../infra/models/embedConfig';

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

class AuthenticateGenerateTokenBIService {
  // eslint-disable-next-line consistent-return

  public async getEmbedInfo() {
    // Get the Report Embed details
    try {
      // Get report details and embed token
      const embedParams = await this.getEmbedParamsForSingleReport(
        config.workspaceId,
        config.reportId,
      );

      return {
        accessToken: embedParams.embedToken.token,
        embedUrl: embedParams.reportsDetail,
        expiry: embedParams.embedToken.expiration,
        status: 200,
      };
    } catch (err) {
      return {
        status: err.status,
        error: `Error while retrieving report embed details\r\n${
          err.statusText
        }\r\nRequestId: \n${err.headers.get('requestid')}`,
      };
    }
  }

  public async getEmbedParamsForSingleReport(
    workspaceId: string,
    reportId: string,
    additionalDatasetId?: any,
  ) {
    const reportInGroupApi = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`;
    const headers: any = await this.getRequestHeader();

    // Get report info by calling the PowerBI REST API
    const result = await fetch(reportInGroupApi, {
      method: 'GET',
      headers,
    });

    if (!result.ok) {
      throw result;
    }

    // Convert result in json to retrieve values
    const resultJson = await result.json();
    // Add report data for embedding

    const reportDetails = new PowerBiReportDetails(
      resultJson.id,
      resultJson.name,
      resultJson.embedUrl,
    );

    const reportEmbedConfig = new EmbedConfig();

    // Create mapping for report and Embed URL
    reportEmbedConfig.reportsDetail = [reportDetails];

    // Create list of datasets
    const datasetIds = [resultJson.datasetId];

    // Append additional dataset to the list to achieve dynamic binding later
    if (additionalDatasetId) {
      datasetIds.push(additionalDatasetId);
    }

    // Get Embed token multiple resources
    reportEmbedConfig.embedToken = await this.getEmbedTokenForSingleReportSingleWorkspace(
      reportId,
      datasetIds,
      workspaceId,
    );

    return reportEmbedConfig; // Resposta necessaria no front IMPORTANTE
  }

  public async getEmbedTokenForSingleReportSingleWorkspace(
    reportId: string,
    datasetIds: string[],
    targetWorkspaceId: string,
  ) {
    // Add report id in the request
    // Add dataset ids in the request

    const formData = {
      reports: [
        {
          id: reportId,
        },
      ],
      datasets: [
        {
          id: datasetIds[0],
        },
      ],
      targetWorkspaces: [
        {
          id: targetWorkspaceId,
        },
      ],
    };

    // Add targetWorkspace id in the request

    const embedTokenApi = 'https://api.powerbi.com/v1.0/myorg/GenerateToken';
    const headers: any = await this.getRequestHeader();

    // Generate Embed token for single report, workspace, and multiple datasets. Refer https://aka.ms/MultiResourceEmbedToken

    const result = await fetch(embedTokenApi, {
      method: 'POST',
      headers,
      body: JSON.stringify(formData),
    });

    if (!result.ok) throw result;

    return result.json();
  }

  // eslint-disable-next-line consistent-return
  public async getAccessToken(): Promise<any> {
    const { AuthenticationContext } = adal;

    const authorityUrl = config.authorityUri;

    if (config.authenticationMode.toLowerCase() === 'masteruser') {
      const context = new AuthenticationContext(authorityUrl);

      return new Promise((resolve, reject) => {
        context.acquireTokenWithUsernamePassword(
          config.scope,
          config.pbiUsername,
          config.pbiPassword,
          config.clientId,
          function (err, tokenResponse) {
            // Function returns error object in tokenResponse
            // Invalid Username will return empty tokenResponse, thus err is used
            if (err) {
              reject(tokenResponse == null ? err : tokenResponse);
            }
            resolve(tokenResponse);
          },
        );
      });
    }
  }

  public async getRequestHeader() {
    // Store authentication token
    let tokenResponse;

    // Store the error thrown while getting authentication token
    let errorResponse;

    // Get the response from the authentication request
    try {
      tokenResponse = await this.getAccessToken();
    } catch (err) {
      if (
        err.hasOwnProperty('error_description') &&
        err.hasOwnProperty('error')
      ) {
        errorResponse = err.error_description;
      } else {
        // Invalid PowerBI Username provided
        errorResponse = err.toString();
      }
      return {
        status: 401,
        error: errorResponse,
      };
    }

    // Extract AccessToken from the response
    const token = tokenResponse.accessToken;
    return {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(token),
    };
  }
}

export default AuthenticateGenerateTokenBIService;
