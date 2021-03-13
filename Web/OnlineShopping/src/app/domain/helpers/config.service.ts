export class ConfigService {

  public apiUrl = '';

  // FTP URL
  public imagePath = '';
  // Whether or not to enable debug mode
  public enableDebug = true;

  public baseHref = '';

  public siteUrl = '';

  public sessionExpiration: number;

  constructor() {
  }
}
