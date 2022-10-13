-- Get customer_id after register.
CREATE OR REPLACE FUNCTION get_new_customer_id()
    RETURNS INTEGER AS
    $$
    DECLARE
        cust_id INTEGER;
    BEGIN
        -- Get the last customer_id from customer table.
        SELECT customer.customer_id INTO cust_id FROM customer ORDER BY customer.customer_id DESC LIMIT 1;
        IF FOUND THEN
			RETURN cust_id;
        ELSE
			RAISE EXCEPTION 'Customer not found';
        END IF;
    END
    $$
    LANGUAGE plpgsql;

-- Set order_detail_id after making a purchase.
-- This avoid creating a new order_detail_id for each product from the same invoice.
CREATE OR REPLACE FUNCTION set_order_detail_id()
	RETURNS INTEGER AS
	$BODY$
	DECLARE
		order_id INTEGER;
	BEGIN
        -- Get the last value from order_detail_id sequence
		PERFORM nextval('order_detail_id_seq');
		SELECT order_detail_id_seq.last_value INTO order_id FROM order_detail_id_seq;
	RETURN order_id;
	END;
	$BODY$
	LANGUAGE plpgsql;

-- Insert data to the order_detail table using the order_detail_id created before
CREATE OR REPLACE FUNCTION set_order_detail(order_id INTEGER, cust_id INTEGER)
	RETURNS void AS
	$BODY$
	DECLARE
		purch_date DATE;
	BEGIN
		purch_date := NOW()::DATE;
		INSERT INTO order_detail (order_detail_id, customer_id, purchase_date) VALUES (order_id, cust_id, purch_date);
	END;
	$BODY$
	LANGUAGE plpgsql;

-- Insert the purchased products from the same order using the order_detail_id created before
CREATE OR REPLACE FUNCTION set_order_item(order_id INTEGER, prod_id INTEGER, quant INTEGER, amount INTEGER)
    RETURNS void AS
    $BODY$
    BEGIN
        INSERT INTO order_item (order_detail_id, product_id, product_quantity, item_total_cost) VALUES (order_id, prod_id, quant, amount);
    END;
    $BODY$
    LANGUAGE plpgsql;

-- Create product table
CREATE TABLE product (
    product_id INTEGER,
    product_name VARCHAR(25) NOT NULL CHECK (product_name <> ''),
    CONSTRAINT pk_product PRIMARY KEY (product_id)
);

-- Create product_id sequence for auto increment
CREATE SEQUENCE product_product_id_seq
    START WITH 656589
    INCREMENT BY 215
    OWNED BY product.product_id;

-- Represents all products variants
CREATE TABLE product_variant (
    product_id INTEGER,
    product_variant_id SERIAL,
    product_gender VARCHAR(25),
    product_category VARCHAR(25),
    product_shipping_cost INTEGER NOT NULL,
    product_color VARCHAR(25),
    product_price INTEGER NOT NULL,
    product_stock INTEGER NOT NULL,
    CONSTRAINT pk_product_variant_id PRIMARY KEY (product_id, product_variant_id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product (product_id)
);

-- pendiente tabla product_option

-- Insert available products to the product table
INSERT INTO product (product_id, product_name) VALUES (nextval('product_product_id_seq'), 'Blusa');
INSERT INTO product (product_id, product_name) VALUES (nextval('product_product_id_seq'), 'Camisa');
INSERT INTO product (product_id, product_name) VALUES (nextval('product_product_id_seq'), 'Corbata');
INSERT INTO product (product_id, product_name) VALUES (nextval('product_product_id_seq'), 'Pantalon');
INSERT INTO product (product_id, product_name) VALUES (nextval('product_product_id_seq'), 'Pantaloneta');
INSERT INTO product (product_id, product_name) VALUES (nextval('product_product_id_seq'), 'Zapatos');

INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'hombre', 'camisa', 10000, 'azul', 50000, 100);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'hombre', 'camiseta', 10000, 'rojo', 50000, 50);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'hombre', 'camisa', 10000, 'amarillo', 50000, 60);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'mujer', 'blusa', 10000, 'azul', 50000, 100);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'mujer', 'camiseta', 10000, 'rojo', 50000, 50);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'mujer', 'blusa', 10000, 'amarillo', 50000, 60);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'sin genero', 'camiseta', 10000, 'verde', 50000, 100);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'sin genero', 'pantalon', 10000, 'azul', 50000, 50);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'niño', 'zapatos', 10000, 'azul', 50000, 100);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'niño', 'camiseta', 10000, 'rojo', 50000, 50);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656804, 'niño', 'maletin', 10000, 'amarillo', 50000, 60);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656804, 'niña', 'zapatos', 10000, 'azul', 50000, 100);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'niña', 'blusa', 10000, 'rojo', 50000, 50);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'niña', 'maletin', 10000, 'amarillo', 50000, 60);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'bebe', 'zapatos', 10000, 'azul', 50000, 100);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'bebe', 'camiseta', 10000, 'rojo', 50000, 50);
INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (656589, 'bebe', 'maletin', 10000, 'amarillo', 50000, 60);


-- Create customer table
CREATE TABLE customer (
    customer_id SERIAL,
    customer_name VARCHAR(25) NOT NULL CHECK (customer_name <> ''),
    customer_lastname VARCHAR(25),
    customer_email VARCHAR(40) UNIQUE NOT NULL CHECK (customer_email <> ''),
    customer_password VARCHAR(100) NOT NULL CHECK (customer_password <> ''),
    CONSTRAINT pk_customer PRIMARY KEY (customer_id)
);

-- Create wishlist table
CREATE TABLE wishlist (
    customer_id INTEGER,
    product_id INTEGER,
    CONSTRAINT pk_wishlist PRIMARY KEY (customer_id, product_id),
    CONSTRAINT fk_wishlist_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES product (product_id)
);

-- Set the customer orders
CREATE TABLE order_detail (
    order_detail_id INTEGER,
    customer_id INTEGER NOT NULL,
    purchase_date DATE NOT NULL,
    CONSTRAINT pk_order_detail PRIMARY KEY (order_detail_id),
    CONSTRAINT fk_order_detail_customer_id FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Automatic sequence for order_detail_id
CREATE SEQUENCE order_detail_id_seq
    START WITH 1000
    INCREMENT BY 1
    OWNED BY order_detail.order_detail_id;

-- Contains the products purchased by the customer
CREATE TABLE order_item (
    order_item_id SERIAL,
    order_detail_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_quantity INTEGER NOT NULL,
    item_total_cost INTEGER NOT NULL,
    CONSTRAINT pk_order_item PRIMARY KEY (order_item_id, order_detail_id),
    CONSTRAINT fk_order_item_order_detail_id FOREIGN KEY (order_detail_id) REFERENCES order_detail(order_detail_id),
    CONSTRAINT fk_order_item_product_id FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Create store table
CREATE TABLE store (
    store_nit INTEGER,
    store_name VARCHAR(30) NOT NULL CHECK (store_name <> ''),
    store_address VARCHAR(30) NOT NULL CHECK (store_address <> ''),
    CONSTRAINT pk_store PRIMARY KEY (store_nit)
);

-- Create nit sequence for auto increment
CREATE SEQUENCE nit_seq
    START WITH 2020
    INCREMENT BY 1
    OWNED BY store.store_nit;

-- Insert store data to the store table
INSERT INTO store (store_nit, store_name, store_address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM SUR', 'CR 29B N 325-4');
INSERT INTO store (store_nit, store_name, store_address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM NORTE', 'CR 100 N110-2');
INSERT INTO store (store_nit, store_name, store_address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM ORIENTE', 'CR 5 N20-12');
INSERT INTO store (store_nit, store_name, store_address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM OCCIDENTE', 'CR 5 N1-2');
INSERT INTO store (store_nit, store_name, store_address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM SUROCCIDENTE', 'CR 7 N56-32');

-- Create a table containing the store's phone numbers
CREATE TABLE store_phone (
    store_nit INTEGER,
    store_phone BIGINT NOT NULL,
    CONSTRAINT pk_store_phone PRIMARY KEY (store_nit),
    CONSTRAINT fk_store_phone FOREIGN KEY (store_nit) REFERENCES store(store_nit)
);

-- Insert store's phone numbers to the store_phone table
INSERT INTO store_phone (store_nit, store_phone) VALUES (2020, 4225136);
INSERT INTO store_phone (store_nit, store_phone) VALUES (2021, 4225136);
INSERT INTO store_phone (store_nit, store_phone) VALUES (2022, 4218755);
INSERT INTO store_phone (store_nit, store_phone) VALUES (2023, 4856923);
INSERT INTO store_phone (store_nit, store_phone) VALUES (2024, 4128745);
