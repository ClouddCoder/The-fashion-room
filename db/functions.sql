-- Gets customer_id after register.
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

-- Sets order_detail_id after making a purchase.
-- This avoid creating a new order_detail_id for each product from the same invoice.
CREATE OR REPLACE FUNCTION set_order_detail_id()
	RETURNS INTEGER AS
	$BODY$
	DECLARE
		order_id INTEGER;
	BEGIN
    -- Gets the last value from order_detail_id sequence.
		PERFORM nextval('order_detail_id_seq');
		SELECT order_detail_id_seq.last_value INTO order_id FROM order_detail_id_seq;
	RETURN order_id;
	END;
	$BODY$
	LANGUAGE plpgsql;

-- Inserts data to the order_detail table using the order_detail_id created before.
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

-- Inserts the purchased products from the same order using the order_detail_id created before.
CREATE OR REPLACE FUNCTION set_order_item(order_id INTEGER, var_id INTEGER, var_quant INTEGER, amount INTEGER)
    RETURNS void AS
    $BODY$
    BEGIN
        INSERT INTO order_item (order_detail_id, variant_id, product_quantity, item_total_cost) VALUES (order_id, var_id, var_quant, amount);
    END;
    $BODY$
    LANGUAGE plpgsql;

-- Inserts a new product's variant.
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

-- Creates product_id sequence for auto increment.
CREATE SEQUENCE product_product_id_seq
    START WITH 656589
    INCREMENT BY 215
    OWNED BY product.product_id;

-- Creates sequence for order_detail_id for auto increment.
CREATE SEQUENCE order_detail_id_seq
    START WITH 1000
    INCREMENT BY 1
    OWNED BY order_detail.order_detail_id;

-- Creates nit sequence for auto increment
CREATE SEQUENCE nit_seq
    START WITH 2020
    INCREMENT BY 1
    OWNED BY store.store_nit;