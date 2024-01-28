import * as ItemService from '../src/items/items.service';
import { Items } from '../src/items/items.interface';
import { BaseItem, Item } from '../src/items/item.interface';

const items: Items = {
    1: {
        id: 1,
        name: 'Burger',
        price: 599,
        description: 'Tasty',
        image: 'https://cdn.auth0.com/blog/whatabyte/burger-sm.png'
    },
    2: {
        id: 2,
        name: 'Pizza',
        price: 299,
        description: 'Cheesy',
        image: 'https://cdn.auth0.com/blog/whatabyte/pizza-sm.png'
    },
    3: {
        id: 3,
        name: 'Tea',
        price: 199,
        description: 'Informative',
        image: 'https://cdn.auth0.com/blog/whatabyte/tea-sm.png'
    }
};

test("FindAll function's result should be all items", async () => {
    const result: Item[] = await ItemService.findAll();

    expect(Object.values(items)).toEqual(result);
});

test("Find function's result should be a item", async () => {
    const id: number = 1;
    const result: Item = await ItemService.find(1);

    expect(result).toEqual(items['1']);
});

test("Create Function's result should create a item", async () => {
    const item: BaseItem = {
        description: '',
        image: '',
        name: '',
        price: 0
    };

    const result: Item = await ItemService.create(item);
    const items: Items = await ItemService.findAll();

    expect(result).toEqual(items[3]);
});

test(`Update Function should update at least one item`, async () => {
    const item_update: BaseItem = {
        description: 'update description',
        image: 'update image',
        name: 'update name',
        price: 0
    };

    const id_update = 1;
    const id_non_exist = 12345;

    const result = await ItemService.update(id_update, item_update);
    const is_null = await ItemService.update(id_non_exist, item_update);
    const items: Items = await ItemService.findAll();

    expect(result).toEqual(items[0]);
    expect(is_null).toBeNull();
});

test('Remove Function should delete at least one item', async () => {
    const id_delete = 1;
    const id_non_existed = 12345;

    await ItemService.remove(id_delete);
    const is_null = await ItemService.remove(id_non_existed);
    const items: Items = await ItemService.findAll();

    expect(items[0].id).not.toBe(1);
    expect(is_null).toBeNull();
});
