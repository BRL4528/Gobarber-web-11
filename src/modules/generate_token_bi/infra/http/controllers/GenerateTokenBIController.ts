/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateGenerateTokenBIService from '@modules/generate_token_bi/services/AuthenticateGenerateTokenBIService';
import { validateConfig } from '../../../services/utils';

export default class GenerateTokenBIController {
  public async index(req: Request, res: Response): Promise<any> {
    // Validate whether all the required configurations are provided in config.json

    const embedToken = container.resolve(AuthenticateGenerateTokenBIService);

    const configCheckResult = validateConfig();

    if (configCheckResult) {
      return {
        status: 400,
        error: configCheckResult,
      };
    }
    // Get the details like Embed URL, Access token and Expiry
    const result = await embedToken.getEmbedInfo();

    // result.status specified the statusCode that will be sent along with the result object
    res.status(result.status).send(result);
  }
}
