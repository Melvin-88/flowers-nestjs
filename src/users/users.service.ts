import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'admin', password: 'admin', role: 'admin' },
    { id: 2, username: 'user', password: 'user', role: 'user' },
  ];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  findOne(id: number): Omit<User, 'password'> {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user;
    return rest;
  }

  create(body: {
    username: string;
    password: string;
    role: string;
  }): Omit<User, 'password'> {
    const id = Math.max(...this.users.map((u) => u.id), 0) + 1;
    const user: User = { id, ...body };
    this.users.push(user);
    const { password, ...rest } = user;
    return rest;
  }

  update(id: number, body: Partial<Omit<User, 'id'>>): Omit<User, 'password'> {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    this.users[idx] = { ...this.users[idx], ...body, id }; // не дозволяємо змінювати id
    const { password, ...rest } = this.users[idx];
    return rest;
  }

  patch(id: number, body: Partial<Omit<User, 'id'>>): Omit<User, 'password'> {
    return this.update(id, body);
  }

  remove(id: number): Omit<User, 'password'> {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    const [removed] = this.users.splice(idx, 1);
    const { password, ...rest } = removed;
    return rest;
  }

  validateUser(username: string, password: string): User | undefined {
    return this.users.find(
      (user) => user.username === username && user.password === password,
    );
  }
}
