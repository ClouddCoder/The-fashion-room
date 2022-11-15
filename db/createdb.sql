-- Contains product's category.
CREATE TABLE category (
    category_id SERIAL,
    category_name VARCHAR(25) NOT NULL,
    CONSTRAINT pk_category PRIMARY KEY (category_id)
);

-- Contains different genders for the product.
CREATE TABLE gender (
    gender_id SERIAL,
    gender_value VARCHAR(25),
    CONSTRAINT pk_gender PRIMARY KEY (gender_id)
);

-- Contains different products.
CREATE TABLE product (
    product_id INTEGER,
    category_id INTEGER,
    product_name VARCHAR(25) NOT NULL CHECK (product_name <> ''),
    gender_id INTEGER,
    shipping_cost INTEGER NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (product_id),
    CONSTRAINT fk_product_category_id FOREIGN KEY (category_id) REFERENCES category (category_id),
    CONSTRAINT fk_product_gender_id FOREIGN KEY (gender_id) REFERENCES gender (gender_id)
);

-- Contains product' variants.
CREATE TABLE variant (
    variant_id SERIAL,
    product_id INTEGER,
    variant_name VARCHAR(50) NOT NULL CHECK (variant_name <> ''),
    variant_price INTEGER NOT NULL CHECK (variant_price >= 0),
    variant_quantity INTEGER NOT NULL,
    CONSTRAINT pk_variant PRIMARY KEY (variant_id),
    CONSTRAINT fk_variant_product_id FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT
);

-- Contains different colors for the product.
CREATE TABLE color (
    color_id SERIAL,
    color_value VARCHAR(25),
    CONSTRAINT pk_color PRIMARY KEY (color_id)
);

-- Joining table for variant and color.
CREATE TABLE variant_color (
    variant_id INTEGER,
    color_id INTEGER,
    CONSTRAINT pk_variant_color PRIMARY KEY (variant_id, color_id),
    CONSTRAINT fk_variant_color_variant_id FOREIGN KEY (variant_id) REFERENCES variant (variant_id),
    CONSTRAINT fk_variant_color_color_id FOREIGN KEY (color_id) REFERENCES color (color_id)
);

-- Contains all customers.
CREATE TABLE customer (
    customer_id SERIAL,
    customer_name VARCHAR(25) NOT NULL CHECK (customer_name <> ''),
    customer_lastname VARCHAR(25),
    customer_email VARCHAR(40) UNIQUE NOT NULL CHECK (customer_email <> ''),
    customer_password VARCHAR(100) NOT NULL CHECK (customer_password <> ''),
    CONSTRAINT pk_customer PRIMARY KEY (customer_id)
);

-- Contains customer's wishlist.
CREATE TABLE wishlist (
    customer_id INTEGER,
    product_id INTEGER,
    CONSTRAINT pk_wishlist PRIMARY KEY (customer_id, product_id),
    CONSTRAINT fk_wishlist_customer_id FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
    CONSTRAINT fk_wishlist_variant_id FOREIGN KEY (product_id) REFERENCES product (product_id)
);

-- Contains all customer's orders.
CREATE TABLE order_detail (
    order_detail_id INTEGER,
    customer_id INTEGER NOT NULL,
    purchase_date DATE NOT NULL,
    CONSTRAINT pk_order_detail PRIMARY KEY (order_detail_id),
    CONSTRAINT fk_order_detail_customer_id FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);

-- Contains the customer's purchased products for each order.
CREATE TABLE order_item (
    order_item_id SERIAL,
    order_detail_id INTEGER NOT NULL,
    variant_id INTEGER NOT NULL,
    product_quantity INTEGER NOT NULL,
    item_total_cost INTEGER NOT NULL,
    CONSTRAINT pk_order_item PRIMARY KEY (order_item_id, order_detail_id),
    CONSTRAINT fk_order_item_order_detail_id FOREIGN KEY (order_detail_id) REFERENCES order_detail(order_detail_id) ON DELETE CASCADE,
    CONSTRAINT fk_order_item_variant_id FOREIGN KEY (variant_id) REFERENCES variant(variant_id) ON DELETE RESTRICT
);

-- Contains store's information.
CREATE TABLE store (
    store_nit INTEGER,
    store_name VARCHAR(30) NOT NULL CHECK (store_name <> ''),
    store_address VARCHAR(30) NOT NULL CHECK (store_address <> ''),
    CONSTRAINT pk_store PRIMARY KEY (store_nit)
);

-- Contains store's phone numbers.
CREATE TABLE store_phone (
    store_nit INTEGER,
    phone BIGINT NOT NULL,
    CONSTRAINT pk_store_phone PRIMARY KEY (store_nit, phone),
    CONSTRAINT fk_store_phone_store_nit FOREIGN KEY (store_nit) REFERENCES store(store_nit)
);
