import { log } from 'console';
import fs from 'fs';

export default class cartManager {

    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    getCarts = async () => {
        try {
            //Verifico que exista el archivo para leerlo
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const cart = JSON.parse(data);
                return cart;
            }else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addCart(cart) {

        // ASIGNO ID
        if (this.carts.length === 0) {
            carts.id = 1;
        } else {
            carts.id = this.carts[this.carts.length - 1].id + 1;
        }

        this.carts.push(cart);
        return cart;
    }

    async getById(id) {
        const cart = this.carts.find(cart => cart.id===id);
        return cart;
    }
}