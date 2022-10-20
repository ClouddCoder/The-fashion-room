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

-- Inserts a new product variant
CREATE OR REPLACE FUNCTION set_product_variant(prod_gender VARCHAR(25), prod_categ VARCHAR(25), prod_ship_cost INT, prod_color VARCHAR(25), prod_price INT, prod_stock INT)
    RETURNS void AS
    $BODY$
    DECLARE
        prod_var_id INTEGER;
    BEGIN
        SELECT product_id INTO prod_var_id FROM product WHERE product.product_name = prod_categ;
        INSERT INTO product_variant (product_id, product_gender, product_category, product_shipping_cost, product_color, product_price, product_stock) VALUES (prod_var_id, prod_gender, prod_categ, prod_ship_cost, prod_color, prod_price, prod_stock);
    END;
    $BODY$
    LANGUAGE plpgsql;

CREATE TABLE category (
    category_id SERIAL,
    category_name VARCHAR(25) NOT NULL,
    CONSTRAINT pk_category PRIMARY KEY (category_id)
);

INSERT INTO category (category_name) VALUES ('calzado'), ('camisas'), ('pantalones'), ('deportiva'), ('bolsos');

-- Create product table
CREATE TABLE product (
    product_id INTEGER,
    category_id INTEGER,
    product_name VARCHAR(25) NOT NULL CHECK (product_name <> ''),
    CONSTRAINT pk_product PRIMARY KEY (product_id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (category_id)
);

-- Create product_id sequence for auto increment
CREATE SEQUENCE product_product_id_seq
    START WITH 656589
    INCREMENT BY 215
    OWNED BY product.product_id;

-- Represents all products variants
CREATE TABLE variant (
    variant_id SERIAL,
    product_id INTEGER,
    variant_name VARCHAR(50) NOT NULL CHECK (variant_name <> ''),
    variant_price INTEGER NOT NULL CHECK (variant_price > 0),
    variant_quantity INTEGER NOT NULL,
    CONSTRAINT pk_product_variant PRIMARY KEY (variant_id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product (product_id)
);

-- Contains all attributes for product variants
CREATE TABLE attribute (
    attribute_id SERIAL,
    attribute_type VARCHAR(25),
    attribute_value VARCHAR(25),
    CONSTRAINT pk_attribute PRIMARY KEY (attribute_id)
);

INSERT INTO attribute (attribute_type, attribute_value)
VALUES
('genero', 'hombre'),
('genero', 'mujer'),
('genero', 'niño'),
('genero', 'niña'),
('genero', 'bebe'),
('genero', 'unisex'),
('envio', 0),
('envio', 1000),
('envio', 2000),
('envio', 10000),
('color', 'negro'),
('color', 'blanco'),
('color', 'gris'),
('color', 'rojo'),
('color', 'azul'),
('color', 'amarillo'),
('color', 'verde');

-- Joining table for product_variant and attribute
CREATE TABLE variant_attribute (
    variant_id INTEGER,
    attribute_id INTEGER,
    CONSTRAINT pk_variant_attribute PRIMARY KEY (variant_id, attribute_id),
    CONSTRAINT fk_product_variant_id FOREIGN KEY (variant_id) REFERENCES variant (variant_id),
    CONSTRAINT fk_attribute_id FOREIGN KEY (attribute_id) REFERENCES attribute (attribute_id)
);

-- Insert available products to the product table
INSERT INTO product (product_id, category_id, product_name)
VALUES
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisas'), 'blusa'),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisas'), 'camisa'),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisas'), 'corbata'),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'pantalones'), 'pantalon'),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'pantalones'), 'pantaloneta'),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'zapatos');

INSERT INTO variant (product_id, variant_name, variant_price, variant_quantity)
VALUES
((SELECT product_id FROM product WHERE product_name = 'blusa'), 'blusa-negra-mujer', 50000, 10),
((SELECT product_id FROM product WHERE product_name = 'blusa'), 'blusa-blanca-mujer', 60000, 10),
((SELECT product_id FROM product WHERE product_name = 'blusa'), 'blusa-roja-mujer', 55000, 50),
((SELECT product_id FROM product WHERE product_name = 'blusa'), 'blusa-blanca-niña', 45000, 10),
((SELECT product_id FROM product WHERE product_name = 'blusa'), 'blusa-roja-niña', 40000, 20),
((SELECT product_id FROM product WHERE product_name = 'camisa'), 'camisa-negra-hombre', 65000, 35),
((SELECT product_id FROM product WHERE product_name = 'camisa'), 'camisa-amarilla-hombre', 55000, 35),
((SELECT product_id FROM product WHERE product_name = 'camisa'), 'camisa-verde-hombre', 50000, 35),
((SELECT product_id FROM product WHERE product_name = 'camisa'), 'camisa-blanca-niño', 30000, 20),
((SELECT product_id FROM product WHERE product_name = 'camisa'), 'camisa-negra-niño', 45000, 15),
((SELECT product_id FROM product WHERE product_name = 'corbata'), 'corbata-negra-hombre', 30000, 20),
((SELECT product_id FROM product WHERE product_name = 'corbata'), 'corbata-azul-hombre', 23000, 50),
((SELECT product_id FROM product WHERE product_name = 'corbata'), 'corbata-verde-hombre', 25000, 15),
((SELECT product_id FROM product WHERE product_name = 'corbata'), 'corbata-negra-niño', 20000, 15),
((SELECT product_id FROM product WHERE product_name = 'corbata'), 'corbata-azul-niño', 15000, 15),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-negro-hombre', 65000, 50),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-azul-hombre', 45000, 75),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-gris-hombre', 60000, 32),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-rojo-mujer', 65000, 50),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-gris-mujer', 45000, 75),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-azul-mujer', 60000, 32),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-azul-niño', 35000, 23),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-rojo-niño', 45000, 45),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-amarillo-niña', 35000, 23),
((SELECT product_id FROM product WHERE product_name = 'pantalon'), 'pantalon-azul-niña', 45000, 45),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-roja-hombre', 25000, 12),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-amarilla-hombre', 25000, 31),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-blanca-hombre', 25000, 59),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-roja-mujer', 25000, 12),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-amarilla-mujer', 25000, 31),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-blanca-mujer', 25000, 59),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-amarilla-niño', 10000, 12),
((SELECT product_id FROM product WHERE product_name = 'pantaloneta'), 'pantaloneta-gris-niño', 25000, 9),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-negros-hombre', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-azules-hombre', 90000, 32),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-verdes-hombre', 70000, 58),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-amarillos-mujer', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-azules-mujer', 90000, 32),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-grises-mujer', 70000, 58),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-grises-niño', 50000, 17),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-amarillos-niño', 60000, 17),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-verdes-niña', 80000, 25),
((SELECT product_id FROM product WHERE product_name = 'zapatos'), 'zapatos-azules-niña', 80000, 41);

INSERT INTO variant_attribute (variant_id, attribute_id)
VALUES
-- blusa-negra-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-negra-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-negra-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-negra-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'negro')),

-- blusa-blanca-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'blanco')),

-- blusa-roja-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'rojo')),

-- blusa-blanca-niña
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niña')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'blanco')),

-- blusa-roja-niña
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niña')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'rojo')),

-- camisa-negra-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'negro')),

-- camisa-amarilla-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-amarilla-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-amarilla-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-amarilla-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'amarillo')),

-- camisa-verde-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-verde-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-verde-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-verde-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'verde')),

-- camisa-blanca-niño
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-blanca-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-blanca-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-blanca-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'blanco')),

-- camisa-negra-niño
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'negro')),

-- corbata-negra-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'negro')),

-- corbata-azul-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- corbata-verde-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-verde-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-verde-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-verde-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'verde')),

-- corbata-negra-niño
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'negro')),

-- corbata-azul-niño
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '1000')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- pantalon-negro-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-negro-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-negro-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-negro-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'negro')),

-- pantalon-azul-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- pantalon-gris-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'gris')),

-- pantalon-rojo-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'rojo')),

-- pantalon-gris-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'gris')),

-- pantalon-azul-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- pantalon-azul-niño
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- pantalon-rojo-niño
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'rojo')),

-- pantalon-amarillo-niña
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-amarillo-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niña')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-amarillo-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-amarillo-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'amarillo')),

-- pantalon-azul-niña
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niña')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- pantaloneta-roja-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-roja-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-roja-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-roja-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'rojo')),

-- pantaloneta-amarilla-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'amarillo')),

-- pantaloneta-blanca-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-blanca-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-blanca-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-blanca-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'blanco')),

-- pantaloneta-roja-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-roja-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-roja-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-roja-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'rojo')),

-- pantaloneta-amarilla-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'amarillo')),

-- pantaloneta-blanca-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-blanca-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-blanca-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-blanca-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'blanco')),

-- pantaloneta-amarilla-niño
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'amarillo')),

-- pantaloneta-gris-niño
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-gris-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-gris-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-gris-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'gris')),

-- zapatos-negros-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-negros-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-negros-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-negros-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'negro')),

-- zapatos-azules-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- zapatos-verdes-hombre
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-verdes-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'hombre')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-verdes-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-verdes-hombre'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'verde')),

-- zapatos-amarillos-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-amarillos-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-amarillos-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-amarillos-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'amarillo')),

-- zapatos-azules-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul')),

-- zapatos-grises-mujer
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-grises-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'mujer')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-grises-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-grises-mujer'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'gris')),

-- zapatos-grises-niño
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-grises-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-grises-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-grises-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'gris')),

-- zapatos-amarillos-niño
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-amarillos-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niño')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-amarillos-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-amarillos-niño'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'amarillo')),

-- zapatos-verdes-niña
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-verdes-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niña')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-verdes-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-verdes-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'verde')),

-- zapatos-azules-niña
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'niña')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = '2000')),
((SELECT variant_id FROM variant WHERE variant_name = 'zapatos-azules-niña'), (SELECT attribute_id FROM attribute WHERE attribute_value = 'azul'));

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
    variant_id INTEGER,
    CONSTRAINT pk_wishlist PRIMARY KEY (customer_id, variant_id),
    CONSTRAINT fk_wishlist_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT fk_wishlist_variant FOREIGN KEY (variant_id) REFERENCES variant (variant_id)
);

-- Set the customer orders
CREATE TABLE order_detail (
    order_detail_id INTEGER,
    customer_id INTEGER NOT NULL,
    purchase_date DATE NOT NULL,
    CONSTRAINT pk_order_detail PRIMARY KEY (order_detail_id),
    CONSTRAINT fk_order_detail FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
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
