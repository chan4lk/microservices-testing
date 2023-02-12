class AuthService {

  private users: { userName: string, password: string, created: Date}[] = [];

  createUser(userName: string, password: string) {
    this.users.push({
        userName,
        password,
        created: new Date()
    });

    return this.users
                    .filter(x => x.userName === userName)
                    .map(x => ({userName: x.userName, created: x.created}))
                    .find(x => x.userName === userName);
  }

  signIn(userName: string, password: string) {

    return this.users
                    .filter(x => x.userName === userName && x.password === password)
                    .map(x => ({userName: x.userName, created: x.created}))
                    .find(x => x.userName === userName);
  }
}

export { AuthService }
