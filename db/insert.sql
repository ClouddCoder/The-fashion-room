INSERT INTO category (category_name) VALUES
('accesorios-moda'),
('calzado'),
('camisas'),
('camisetas'),
('blusas'),
('pantalones-y-jeans'),
('deportiva'),
('bolsos');

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

-- Insert available products to the product table.
INSERT INTO product (product_id, category_id, product_name, shipping_cost)
VALUES
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'blusas'), 'blusa', 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'camisas'), 'camisa', 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'accesorios-moda'), 'corbata', 1000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'pantalones-y-jeans'), 'pantalon', 2000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'pantalones-y-jeans'), 'pantaloneta', 2000),
(nextval('product_product_id_seq'), (SELECT category_id FROM category WHERE category_name = 'calzado'), 'zapatos', 5000);

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

-- Inserts store's information to the store table.
INSERT INTO store (store_nit, store_name, store_address)
VALUES
(nextval('nit_seq'), 'THE FASHION ROOM SUR', 'CR 29B N 325-4'),
(nextval('nit_seq'), 'THE FASHION ROOM NORTE', 'CR 100 N110-2'),
(nextval('nit_seq'), 'THE FASHION ROOM ORIENTE', 'CR 5 N20-12'),
(nextval('nit_seq'), 'THE FASHION ROOM OCCIDENTE', 'CR 5 N1-2'),
(nextval('nit_seq'), 'THE FASHION ROOM SUROCCIDENTE', 'CR 7 N56-32');

-- Inserts store's phone numbers to the store_phone table.
INSERT INTO store_phone (store_nit, phone) VALUES
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUR'), 4225136),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUR'), 4215489),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM NORTE'), 3254984),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM NORTE'), 3254856),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM ORIENTE'), 8445623),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM ORIENTE'), 4725148),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM OCCIDENTE'), 4227452),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM OCCIDENTE'), 8742394),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUROCCIDENTE'), 1225478),
((SELECT store_nit FROM store WHERE store_name = 'THE FASHION ROOM SUROCCIDENTE'), 3668741);