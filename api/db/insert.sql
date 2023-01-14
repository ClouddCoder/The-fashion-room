INSERT INTO category (category_name) VALUES
('accesorios-moda'),
('calzado'),
('camisas'),
('camisetas'),
('blusas'),
('pantalones-y-jeans'),
('deportiva'),
('bolsos');

INSERT INTO gender (gender_value)
VALUES
('hombre'),
('mujer'),
('niño'),
('niña'),
('bebe'),
('unisex');

INSERT INTO color (color_value)
VALUES
('negro'),
('blanco'),
('gris'),
('rojo'),
('azul'),
('amarillo'),
('verde');

-- Insert available products to the product table.
INSERT INTO product (product_id, category_id, product_name, gender_id, shipping_cost)
VALUES
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'blusas'), 'blusa-mujer', 2, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'blusas'), 'blusa-niña', 4, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisas'), 'camisa-niño', 3, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisas'), 'camisa-hombre', 1, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'accesorios-moda'), 'corbata', 1, 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'pantalones-y-jeans'), 'pantalon', 1, 2000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'pantalones-y-jeans'), 'pantaloneta', 1, 2000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis-colegial', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis-golty', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'botas-militar', 1, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'zapatos-colegial', 4, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis-royal', 1, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis-sneakers', 3, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'pantuflas', 1, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'tenis-clasicos', 1, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'botas-udan', 2, 5000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'sandalias', 2, 5000);

INSERT INTO variant (product_id, variant_name, variant_price, variant_quantity)
VALUES
((SELECT product_id FROM product WHERE product_name = 'blusa-mujer'), 'blusa-negra-mujer', 50000, 10),
((SELECT product_id FROM product WHERE product_name = 'blusa-mujer'), 'blusa-blanca-mujer', 60000, 10),
((SELECT product_id FROM product WHERE product_name = 'blusa-mujer'), 'blusa-roja-mujer', 55000, 50),
((SELECT product_id FROM product WHERE product_name = 'blusa-niña'), 'blusa-blanca-niña', 45000, 10),
((SELECT product_id FROM product WHERE product_name = 'blusa-niña'), 'blusa-roja-niña', 40000, 20),
((SELECT product_id FROM product WHERE product_name = 'camisa-hombre'), 'camisa-negra-hombre', 65000, 35),
((SELECT product_id FROM product WHERE product_name = 'camisa-hombre'), 'camisa-amarilla-hombre', 55000, 35),
((SELECT product_id FROM product WHERE product_name = 'camisa-hombre'), 'camisa-verde-hombre', 50000, 35),
((SELECT product_id FROM product WHERE product_name = 'camisa-niño'), 'camisa-blanca-niño', 30000, 20),
((SELECT product_id FROM product WHERE product_name = 'camisa-niño'), 'camisa-negra-niño', 45000, 15),
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
((SELECT product_id FROM product WHERE product_name = 'tenis-colegial'), 'tc-negros-hombre', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'tenis-colegial'), 'tc-azules-hombre', 90000, 32),
((SELECT product_id FROM product WHERE product_name = 'tenis-golty'), 'tg-verdes-hombre', 70000, 58),
((SELECT product_id FROM product WHERE product_name = 'tenis-golty'), 'tg-amarillos-mujer', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'botas-militar'), 'bm-verdes-hombre', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'botas-militar'), 'bm-negros-hombre', 80000, 21),
((SELECT product_id FROM product WHERE product_name = 'zapatos-colegial'), 'zc-azules-mujer', 90000, 32),
((SELECT product_id FROM product WHERE product_name = 'zapatos-colegial'), 'zc-grises-mujer', 70000, 58),
((SELECT product_id FROM product WHERE product_name = 'tenis-royal'), 'tr-grises-niño', 50000, 17),
((SELECT product_id FROM product WHERE product_name = 'tenis-royal'), 'tr-amarillos-niño', 60000, 17),
((SELECT product_id FROM product WHERE product_name = 'tenis-sneakers'), 'ts-verdes-niña', 80000, 25),
((SELECT product_id FROM product WHERE product_name = 'tenis-sneakers'), 'ts-azules-niña', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'pantuflas'), 'p-negras-niño', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'pantuflas'), 'p-amarillas-niña', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'tenis-clasicos'), 'tcl-blancos-hombre', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'tenis-clasicos'), 'tcl-rojos-hombre', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'botas-udan'), 'bu-negras-hombre', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'botas-udan'), 'bu-blancas-hombre', 80000, 41),
((SELECT product_id FROM product WHERE product_name = 'sandalias'), 's-azules-mujer', 40000, 41),
((SELECT product_id FROM product WHERE product_name = 'sandalias'), 's-verdes-niña', 40000, 41);

INSERT INTO variant_color (variant_id, color_id)
VALUES
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-negra-mujer'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-mujer'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-mujer'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-blanca-niña'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'blusa-roja-niña'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-amarilla-hombre'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-verde-hombre'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-blanca-niño'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'camisa-negra-niño'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-hombre'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-verde-hombre'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-negra-niño'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'corbata-azul-niño'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-negro-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-hombre'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-hombre'), (SELECT color_id FROM color WHERE color_value = 'gris')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-mujer'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-gris-mujer'), (SELECT color_id FROM color WHERE color_value = 'gris')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-mujer'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niño'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-rojo-niño'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-amarillo-niña'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantalon-azul-niña'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-roja-hombre'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-hombre'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-blanca-hombre'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-amarilla-niño'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'pantaloneta-gris-niño'), (SELECT color_id FROM color WHERE color_value = 'gris')),
((SELECT variant_id FROM variant WHERE variant_name = 'tc-negros-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'tc-azules-hombre'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'tg-verdes-hombre'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'tg-amarillos-mujer'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'bm-verdes-hombre'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'bm-negros-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'zc-azules-mujer'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'zc-grises-mujer'), (SELECT color_id FROM color WHERE color_value = 'gris')),
((SELECT variant_id FROM variant WHERE variant_name = 'tr-grises-niño'), (SELECT color_id FROM color WHERE color_value = 'gris')),
((SELECT variant_id FROM variant WHERE variant_name = 'tr-amarillos-niño'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'ts-verdes-niña'), (SELECT color_id FROM color WHERE color_value = 'verde')),
((SELECT variant_id FROM variant WHERE variant_name = 'ts-azules-niña'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 'p-negras-niño'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'p-amarillas-niña'), (SELECT color_id FROM color WHERE color_value = 'amarillo')),
((SELECT variant_id FROM variant WHERE variant_name = 'tcl-blancos-hombre'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 'tcl-rojos-hombre'), (SELECT color_id FROM color WHERE color_value = 'rojo')),
((SELECT variant_id FROM variant WHERE variant_name = 'bu-negras-hombre'), (SELECT color_id FROM color WHERE color_value = 'negro')),
((SELECT variant_id FROM variant WHERE variant_name = 'bu-blancas-hombre'), (SELECT color_id FROM color WHERE color_value = 'blanco')),
((SELECT variant_id FROM variant WHERE variant_name = 's-azules-mujer'), (SELECT color_id FROM color WHERE color_value = 'azul')),
((SELECT variant_id FROM variant WHERE variant_name = 's-verdes-niña'), (SELECT color_id FROM color WHERE color_value = 'verde'));

-- Inserts phone numbers to the phone table.
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

-- Inserts store's information to the store table.
INSERT INTO store (store_nit, store_name)
VALUES
(nextval('nit_seq'), 'THE FASHION ROOM SUR'),
(nextval('nit_seq'), 'THE FASHION ROOM NORTE'),
(nextval('nit_seq'), 'THE FASHION ROOM ORIENTE'),
(nextval('nit_seq'), 'THE FASHION ROOM OCCIDENTE'),
(nextval('nit_seq'), 'THE FASHION ROOM SUROCCIDENTE');

-- Relates the store's phone numbers to the store.
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

-- Inserts store's and customer's addresses to the addresses table.
INSERT INTO addresses (department, city, neighborhood, street_type, street, street_number)
VALUES
('Valle', 'Cali', 'Ciudad Jardin', 'Carrera', '45A', '18-58'),
('Antioquia', 'Medellin', 'El Poblado', 'Avenida', '2', '58-41'),
('Cundinamarca', 'Bogota', 'Usaquen', 'Calle', '12', '32-8'),
('Valle', 'Cali', 'Centenario', 'Transversal', '5', '12-1'),
('Antioquia', 'Medellin', 'El Poblado', 'Avenida', '5', '7-25'),
('Cundinamarca', 'Bogota', 'Usaquen', 'Calle', '45', '72-69');

-- Relates the store's addresses to the store.
INSERT INTO store_address (store_nit, address_id)
VALUES
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUR'), (SELECT address_id FROM addresses WHERE street_number = '18-58')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM NORTE'), (SELECT address_id FROM addresses WHERE street_number = '58-41')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM ORIENTE'), (SELECT address_id FROM addresses WHERE street_number = '32-8')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM OCCIDENTE'), (SELECT address_id FROM addresses WHERE street_number = '12-1')),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUROCCIDENTE'), (SELECT address_id FROM addresses WHERE street_number = '7-25'));