-- Get customer_id after register
CREATE OR REPLACE FUNCTION get_new_customer_id()
    RETURNS INTEGER AS
    $$
    DECLARE
        cust_id INTEGER;
    BEGIN
        -- Get the last customer_id from customer table
        SELECT customer.customer_id INTO cust_id FROM customer ORDER BY customer.customer_id DESC LIMIT 1;
        IF FOUND THEN
			RETURN cust_id;
        ELSE
			RAISE EXCEPTION 'Customer not found';
        END IF;
    END
    $$
    LANGUAGE plpgsql;

-- Create invoice_id after making a purchase
-- This avoid creating new invoice_id for each product from the same invoice
CREATE OR REPLACE FUNCTION create_invoice_id()
	RETURNS INTEGER AS
	$BODY$
	DECLARE
		inv_id INTEGER;
	BEGIN
        -- Get the last value from invoice_id sequence
		PERFORM nextval('invoice_id_seq');
		SELECT invoice_id_seq.last_value INTO inv_id FROM invoice_id_seq;
	RETURN inv_id;
	END;
	$BODY$
	LANGUAGE plpgsql;

-- Insert data to the invoice table using the invoice_id created before
CREATE OR REPLACE FUNCTION create_invoice(inv_id INTEGER, cust_id INTEGER)
	RETURNS void AS
	$BODY$
	DECLARE
		pur_date DATE;
	BEGIN
		pur_date := NOW()::DATE;
		INSERT INTO invoice (invoice_id, customer_id, purchase_date) VALUES (inv_id, cust_id, pur_date);
	END;
	$BODY$
	LANGUAGE plpgsql;

-- Insert the purchased products from the same invoice using the invoice_id created before
CREATE OR REPLACE FUNCTION invoice_data(inv_id INTEGER, prod_id INTEGER, quant INTEGER, amount INTEGER)
    RETURNS void AS
    $BODY$
    BEGIN
        INSERT INTO invoice_detail (invoice_id, product_id, quantity, total_amount) VALUES (inv_id, prod_id, quant, amount);
    END;
    $BODY$
    LANGUAGE plpgsql;

-- Create product table
CREATE TABLE product (
    product_id INTEGER,
    product_name VARCHAR(25) NOT NULL CHECK (product_name <> ''),
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (product_id)
);

-- Create product_id sequence for auto increment
CREATE SEQUENCE product_product_id_seq
    START WITH 656589
    INCREMENT BY 215
    OWNED BY product.product_id;

-- Insert available products to the product table
INSERT INTO product (product_id, product_name, price, stock) VALUES (nextval('product_product_id_seq'), 'Blusa', 45000, 100);
INSERT INTO product (product_id, product_name, price, stock) VALUES (nextval('product_product_id_seq'), 'Camisa', 40000, 100);
INSERT INTO product (product_id, product_name, price, stock) VALUES (nextval('product_product_id_seq'), 'Corbata', 20000, 100);
INSERT INTO product (product_id, product_name, price, stock) VALUES (nextval('product_product_id_seq'), 'Pantalon', 65000, 100);
INSERT INTO product (product_id, product_name, price, stock) VALUES (nextval('product_product_id_seq'), 'Pantaloneta', 30000, 100);
INSERT INTO product (product_id, product_name, price, stock) VALUES (nextval('product_product_id_seq'), 'Zapatos', 90000, 100);

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
    CONSTRAINT fk_wishlist_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES product (product_id)
);

-- Create invoice table
CREATE TABLE invoice (
    invoice_id INTEGER,
    customer_id INTEGER NOT NULL,
    purchase_date DATE NOT NULL,
    CONSTRAINT pk_invoice PRIMARY KEY (invoice_id),
    CONSTRAINT fk_invoice_customer_id FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Create invoice_id sequence for auto increment
CREATE SEQUENCE invoice_id_seq
    START WITH 1000
    INCREMENT BY 1
    OWNED BY invoice.invoice_id;

-- Create invoice_detail table containing the purchased products
CREATE TABLE invoice_detail (
    invoice_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total_amount INTEGER NOT NULL,
    CONSTRAINT fk_invoice_detail_invoice_id FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id),
    CONSTRAINT fk_invoice_detail_product_id FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Create store table
CREATE TABLE store (
    nit INTEGER,
    name VARCHAR(30) NOT NULL CHECK (name <> ''),
    address VARCHAR(30) NOT NULL CHECK (address <> ''),
    CONSTRAINT pk_store PRIMARY KEY (nit)
);

-- Create nit sequence for auto increment
CREATE SEQUENCE nit_seq
    START WITH 2020
    INCREMENT BY 1
    OWNED BY store.nit;

-- Insert store data to the store table
INSERT INTO store (nit, name, address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM SUR', 'CR 29B N 325-4');
INSERT INTO store (nit, name, address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM NORTE', 'CR 100 N110-2');
INSERT INTO store (nit, name, address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM ORIENTE', 'CR 5 N20-12');
INSERT INTO store (nit, name, address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM OCCIDENTE', 'CR 5 N1-2');
INSERT INTO store (nit, name, address) VALUES (nextval('nit_seq'), 'THE FASHION ROOM SUROCCIDENTE', 'CR 7 N56-32');

-- Create a table containing the store's phone numbers
CREATE TABLE store_phone (
    nit INTEGER,
    phone BIGINT NOT NULL,
    CONSTRAINT pk_store_phone PRIMARY KEY (nit),
    CONSTRAINT fk_store_phone FOREIGN KEY (nit) REFERENCES store(nit)
);

-- Insert store's phone numbers to the store_phone table
INSERT INTO store_phone (nit, phone) VALUES (2020, 4225136);
INSERT INTO store_phone (nit, phone) VALUES (2021, 4225136);
INSERT INTO store_phone (nit, phone) VALUES (2022, 4218755);
INSERT INTO store_phone (nit, phone) VALUES (2023, 4856923);
INSERT INTO store_phone (nit, phone) VALUES (2024, 4128745);
