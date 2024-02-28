import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './../src/user/user.module';
import { UserRepository } from './../src/user/user.repository';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<UserRepository>(UserRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    userRepository.clear();
  });

  it('should return an error if name is not provided', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ body: { email: 'john@example.com' } })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Name is required');
      });
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ body: { name: 'John Doe', email: 'john@example.com' } })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: 'John Doe',
          email: 'john@example.com',
        });
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });
});
