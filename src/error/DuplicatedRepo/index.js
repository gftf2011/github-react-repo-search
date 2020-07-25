export default class DuplicatedRepoError extends Error {
  constructor() {
    super('Repositório duplicado!');
  }
}
