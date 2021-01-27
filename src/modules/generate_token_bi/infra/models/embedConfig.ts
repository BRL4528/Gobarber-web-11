// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

// Properties for embedding the report
class EmbedConfig {
  type?: any;

  embedToken?: any;

  reportsDetail?: any;

  constructor(type?: any, reportsDetail?: any, embedToken?: any) {
    this.type = type;
    this.reportsDetail = reportsDetail;
    this.embedToken = embedToken;
  }
}

export default EmbedConfig;
