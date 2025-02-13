// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { Test, TestingModule } from '@nestjs/testing';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
// import { INestApplication } from '@nestjs/common';

// describe('Grocery Booking API (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async (): Promise<void> => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   // Admin Test Cases
//   describe('Admin Endpoints', () => {
//     let groceryItemId: number;

//     it('should create a new grocery item (POST /admin/add)', async () => {
//       const response = await request(app.getHttpServer())
//         .post('/admin/add')
//         .send({
//           name: 'Tomato',
//           price: 2.5,
//           inventory: 100,
//         })
//         .expect(201);

//       groceryItemId = response.body.id;

//       expect(response.body).toHaveProperty('id');
//       expect(response.body.name).toBe('Tomato');
//       expect(response.body.price).toBe(2.5);
//       expect(response.body.inventory).toBe(100);
//     });

//     it('should view all grocery items (GET /admin/view)', async () => {
//       const response = await request(app.getHttpServer())
//         .get('/admin/view')
//         .expect(200);

//       expect(response.body).toBeInstanceOf(Array);
//       expect(response.body.length).toBeGreaterThan(0);
//       expect(response.body[0]).toHaveProperty('id');
//       expect(response.body[0]).toHaveProperty('name');
//     });

//     it('should update grocery item details (PUT /admin/update/:id)', async () => {
//       const response = await request(app.getHttpServer())
//         .put(`/admin/update/${groceryItemId}`)
//         .send({
//           name: 'Tomato (Updated)',
//           price: 3.0,
//           inventory: 150,
//         })
//         .expect(200);

//       expect(response.body.name).toBe('Tomato (Updated)');
//       expect(response.body.price).toBe(3.0);
//       expect(response.body.inventory).toBe(150);
//     });

//     it('should remove a grocery item (DELETE /admin/remove/:id)', async () => {
//       const response = await request(app.getHttpServer())
//         .delete(`/admin/remove/${groceryItemId}`)
//         .expect(200);

//       expect(response.body.message).toBe('Grocery item removed successfully');
//     });
//   });

//   // User Test Cases
//   describe('User Endpoints', () => {
//     let groceryItemIds: number[];

//     it('should view all grocery items (GET /user/view)', async () => {
//       const response = await request(app.getHttpServer())
//         .get('/user/view')
//         .expect(200);

//       expect(response.body).toBeInstanceOf(Array);
//       expect(response.body.length).toBeGreaterThan(0);

//       // Store the IDs of grocery items for order placement
//       groceryItemIds = response.body.slice(0, 3).map((item) => item.id);
//     });

//     it('should place an order (POST /user/order)', async () => {
//       const response = await request(app.getHttpServer())
//         .post('/user/order')
//         .send({
//           userId: 1,
//           groceryItems: groceryItemIds,
//         })
//         .expect(201);

//       expect(response.body).toHaveProperty('id');
//       expect(response.body.totalPrice).toBeGreaterThan(0);
//       expect(response.body.groceryItems.length).toBe(groceryItemIds.length);
//     });
//   });

//   afterAll(async (): Promise<void> => {
//     await app.close();
//   });
// });
