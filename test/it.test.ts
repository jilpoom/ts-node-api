import supertest from "supertest";
import * as ItemService from '../src/items/items.service'
import {BaseItem, Item} from "../src/items/item.interface";
import {app} from "../src";

const request = supertest(app);
const url: string = '/api/menu/items';

describe('ItemRouter Integration Test', () => {

    it('GET /', async () => {
        const response = await request.get(url);
        const service_result = await ItemService.findAll();

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(service_result);
    })

    it('GET /:id', async () => {
        const id = 1;
        const response = await request.get(`${url}/${id}`);
        const service_result = await ItemService.find(id);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(service_result);
    })

    it('POST /', async () => {
        const data_create: BaseItem = {
            name: "New Image Name",
            image: "new/file/path/image.png",
            price: 10000,
            description: "New Image Description"
        }

        const res = await request
            .post(`${url}`)
            .set('Accept', 'application/json')
            .type('application/json')
            .send(data_create)

        const new_item = await request
            .get(`${url}/${res.body.id}`)

        expect(res.status).toEqual(201);
        expect(res.header['content-type']).toMatch('/json')
        expect(res.body.id).toEqual(new_item.body.id)

    })

    it('PUT /:id', async () => {
        const id_exist = 1;
        const id_non_exist = 12345;

        const data_update: BaseItem = {
            name: "New Image Name",
            image: "new/file/path/image.png",
            price: 10000,
            description: "New Image Description"
        }

        const response_exist = await request.put(`${url}/${id_exist}`)
            .set('Accept', 'application/json')
            .type('application/json')
            .send(data_update)

        expect(response_exist.status).toEqual(200);
        expect(response_exist.header['content-type']).toMatch('/json')
        expect(response_exist.body.id).toEqual(id_exist);

        const response_non_exist = await request.put(`${url}/${id_non_exist}`)
            .set('Accept', 'application/json')
            .type('application/json')
            .send(data_update);

        const new_item = await request
            .get(`${url}/${response_non_exist.body.id}`)

        expect(response_non_exist.status).toEqual(201);
        expect(response_non_exist.header['content-type']).toMatch('/json')
        expect(response_non_exist.body.id).toEqual(new_item.body.id);

    })

    it('DELETE /:id', async () => {
        const id_exist = 1;
        const id_non_exist = 12345;

        await request.delete(`${url}/${id_exist}`)
            .expect(204);

        const all_items = await request.get(`${url}`);


        all_items.body.forEach((item: Item) => {
            expect(item.id).not.toEqual(id_exist);
        })

        const response = await request.delete(`${url}/${id_non_exist}`);

        expect(response.body).toEqual({});

    })

})


