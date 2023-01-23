INSERT INTO category (category_name) VALUES
('camisetas'),
('calzado'),
('deportiva'),
('bolsos');

INSERT INTO gender (gender_value)
VALUES
('hombre'),
('mujer'),
('niño'),
('niña');

INSERT INTO color (color_value)
VALUES
('negro'),
('blanco'),
('gris'),
('rojo'),
('azul'),
('amarillo'),
('verde');

-- Products available to sell.
INSERT INTO product (product_id, category_id, product_name, gender_id, shipping_cost)
VALUES
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisetas'), 'camiseta-hombre', 1, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisetas'), 'camiseta-mujer', 2, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisetas'), 'camiseta-niño', 3, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisetas'), 'camiseta-niña', 4, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis-golty', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'botas-militar', 1, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis-sneakers', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'pantuflas-niño', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'pantuflas-niña', 4, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'sandalias-mujer', 2, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'sandalias-niña', 4, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'deportiva'), 'camiseta-deportiva-hombre', 1, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'deportiva'), 'camiseta-deportiva-mujer', 2, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'deportiva'), 'guantes-entrenamiento', 2, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'bolsos'), 'maleta-morral-hombre', 1, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'bolsos'), 'maleta-morral-niño', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'bolsos'), 'bolso', 2, 5000);

-- Variants of every product.
INSERT INTO variant (product_id, variant_name, variant_price, variant_quantity)
VALUES
((SELECT product_id FROM product WHERE product_name = 'camiseta-mujer'), 'camiseta-negra-mujer', 50000, 10),
((SELECT product_id FROM product WHERE product_name = 'camiseta-mujer'), 'camiseta-blanca-mujer', 60000, 10),
((SELECT product_id FROM product WHERE product_name = 'camiseta-mujer'), 'camiseta-roja-mujer', 55000, 50),
((SELECT product_id FROM product WHERE product_name = 'camiseta-niña'), 'camiseta-blanca-niña', 45000, 10),
((SELECT product_id FROM product WHERE product_name = 'camiseta-niña'), 'camiseta-roja-niña', 40000, 20),
((SELECT product_id FROM product WHERE product_name = 'camiseta-hombre'), 'camiseta-negra-hombre', 65000, 35),
((SELECT product_id FROM product WHERE product_name = 'camiseta-hombre'), 'camiseta-amarilla-hombre', 55000, 35),
((SELECT product_id FROM product WHERE product_name = 'camiseta-hombre'), 'camiseta-verde-hombre', 50000, 35),
((SELECT product_id FROM product WHERE product_name = 'camiseta-niño'), 'camiseta-blanca-niño', 30000, 20),
((SELECT product_id FROM product WHERE product_name = 'camiseta-niño'), 'camiseta-negra-niño', 45000, 15),
((SELECT product_id FROM product WHERE product_name = 'tenis'), 't-negros-hombre', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'tenis'), 't-azules-hombre', 90000, 32),
((SELECT product_id FROM product WHERE product_name = 'tenis-golty'), 'tg-verdes-hombre', 70000, 58),
((SELECT product_id FROM product WHERE product_name = 'tenis-golty'), 'tg-amarillos-mujer', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'botas-militar'), 'bm-verdes-hombre', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'botas-militar'), 'bm-negros-hombre', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'tenis-sneakers'), 'ts-negros-niño', 80000, 25),
((SELECT product_id FROM product WHERE product_name = 'pantuflas-niño'), 'p-negras-niño', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'pantuflas-niña'), 'p-rojas-niña', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'sandalias-mujer'), 's-azules-mujer', 40000, 41),
((SELECT product_id FROM product WHERE product_name = 'sandalias-niña'), 's-verdes-niña', 40000, 41),
((SELECT product_id FROM product WHERE product_name = 'camiseta-deportiva-hombre'), 'camiseta-deportiva-blanca-hombre', 70000, 41),
((SELECT product_id FROM product WHERE product_name = 'camiseta-deportiva-hombre'), 'camiseta-deportiva-negra-hombre', 70000, 41),
((SELECT product_id FROM product WHERE product_name = 'camiseta-deportiva-mujer'), 'camiseta-deportiva-azul-mujer', 50000, 41),
((SELECT product_id FROM product WHERE product_name = 'camiseta-deportiva-mujer'), 'camiseta-deportiva-verde-mujer', 60000, 41),
((SELECT product_id FROM product WHERE product_name = 'guantes-entrenamiento'), 'guantes-entrenamiento-negros-mujer', 30000, 12),
((SELECT product_id FROM product WHERE product_name = 'maleta-morral-hombre'), 'maleta-morral-negra-hombre', 80000, 5),
((SELECT product_id FROM product WHERE product_name = 'maleta-morral-niño'), 'maleta-morral-azul-niño', 50000, 5),
((SELECT product_id FROM product WHERE product_name = 'bolso'), 'bolso-negro-mujer', 50000, 5);

-- Color of every variant.
INSERT INTO variant_color (variant_id, color_id)
VALUES
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-negra-mujer'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-blanca-mujer'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-roja-mujer'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-blanca-niña'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-roja-niña'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-negra-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-amarilla-hombre'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-verde-hombre'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-blanca-niño'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-negra-niño'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 't-negros-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 't-azules-hombre'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'tg-verdes-hombre'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'tg-amarillos-mujer'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'bm-verdes-hombre'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'bm-negros-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'ts-negros-niño'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'p-negras-niño'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'p-rojas-niña'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 's-azules-mujer'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 's-verdes-niña'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-deportiva-blanca-hombre'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-deportiva-negra-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-deportiva-azul-mujer'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'camiseta-deportiva-verde-mujer'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'guantes-entrenamiento-negros-mujer'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'maleta-morral-negra-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'maleta-morral-azul-niño'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'bolso-negro-mujer'), (SELECT color_id FROM color WHERE color_value = 'negro'));

-- Contains all the phones of the stores and users.
INSERT INTO phone (phone_number)
VALUES
('4225136'),
('4215489'),
('3254984'),
('3254856'),
('8445623'),
('4725148'),
('4227452'),
('8742394'),
('1225478'),
('3668741');

-- Information of the stores.
INSERT INTO store (store_nit, store_name)
VALUES
(nextval('nit_seq'), 'THE FASHION ROOM SUR'),
(nextval('nit_seq'), 'THE FASHION ROOM NORTE'),
(nextval('nit_seq'), 'THE FASHION ROOM ORIENTE'),
(nextval('nit_seq'), 'THE FASHION ROOM OCCIDENTE'),
(nextval('nit_seq'), 'THE FASHION ROOM SUROCCIDENTE');

-- Join table between stores and phones.
INSERT INTO store_phone (store_nit, phone_id) VALUES
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUR'), (SELECT phone_id FROM phone WHERE phone_number = '4225136')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUR'), (SELECT phone_id FROM phone WHERE phone_number = '4215489')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM NORTE'), (SELECT phone_id FROM phone WHERE phone_number = '3254984')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM NORTE'), (SELECT phone_id FROM phone WHERE phone_number = '3254856')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM ORIENTE'), (SELECT phone_id FROM phone WHERE phone_number = '8445623')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM ORIENTE'), (SELECT phone_id FROM phone WHERE phone_number = '4725148')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM OCCIDENTE'), (SELECT phone_id FROM phone WHERE phone_number = '4227452')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM OCCIDENTE'), (SELECT phone_id FROM phone WHERE phone_number = '8742394')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUROCCIDENTE'), (SELECT phone_id FROM phone WHERE phone_number = '1225478')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUROCCIDENTE'), (SELECT phone_id FROM phone WHERE phone_number = '3668741'));

-- Contains all the addresses of the stores and users.
INSERT INTO addresses (department, city, neighborhood, street_type, street, street_number)
VALUES
('Valle', 'Cali', 'Ciudad Jardin', 'Carrera', '45A', '18-58'),
('Antioquia', 'Medellin', 'El Poblado', 'Avenida', '2', '58-41'),
('Cundinamarca', 'Bogota', 'Usaquen', 'Calle', '12', '32-8'),
('Valle', 'Cali', 'Centenario', 'Transversal', '5', '12-1'),
('Antioquia', 'Medellin', 'El Poblado', 'Avenida', '5', '7-25'),
('Cundinamarca', 'Bogota', 'Usaquen', 'Calle', '45', '72-69');

-- Join table between stores and addresses.
INSERT INTO store_address (store_nit, address_id)
VALUES
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUR'), (SELECT address_id FROM addresses WHERE street_number = '18-58')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM NORTE'), (SELECT address_id FROM addresses WHERE street_number = '58-41')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM ORIENTE'), (SELECT address_id FROM addresses WHERE street_number = '32-8')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM OCCIDENTE'), (SELECT address_id FROM addresses WHERE street_number = '12-1')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUROCCIDENTE'), (SELECT address_id FROM addresses WHERE street_number = '7-25'));
