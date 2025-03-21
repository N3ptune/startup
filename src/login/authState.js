export class authState {
    static Unknown = new authState('unknown');
    static Authenticated = new authState('authenticated');
    static Unauthenticated = new authState('unauthenticated');
  
    constructor(name) {
      this.name = name;
    }
  }