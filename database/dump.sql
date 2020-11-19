--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
20	17	6	830
38	28	2	138465
39	29	1	143500
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-11-05 11:39:14.70145-08
2	2020-11-05 13:17:56.560628-08
3	2020-11-05 13:19:13.783252-08
4	2020-11-05 13:20:36.638119-08
5	2020-11-05 14:51:21.933781-08
6	2020-11-05 14:51:36.211588-08
7	2020-11-05 14:52:02.026524-08
8	2020-11-05 14:54:14.390875-08
9	2020-11-05 14:56:14.787346-08
10	2020-11-05 14:58:41.366561-08
11	2020-11-05 15:01:07.011509-08
12	2020-11-05 15:01:25.498537-08
13	2020-11-05 15:01:52.889923-08
14	2020-11-05 15:38:11.531646-08
15	2020-11-05 15:40:56.823456-08
16	2020-11-05 15:44:41.261845-08
17	2020-11-06 10:11:30.275554-08
18	2020-11-06 15:17:59.098586-08
19	2020-11-06 15:38:58.357263-08
20	2020-11-06 15:39:38.962982-08
21	2020-11-08 12:42:37.624363-08
22	2020-11-08 20:48:47.38705-08
23	2020-11-08 21:08:16.954862-08
24	2020-11-08 21:22:14.450537-08
25	2020-11-16 17:53:07.6892-08
26	2020-11-17 10:11:04.433031-08
27	2020-11-17 14:25:02.077438-08
28	2020-11-17 14:47:06.054471-08
29	2020-11-18 12:49:54.24737-08
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	18	Joanna	83219321321	address	2020-11-06 15:26:12.697644-08
2	18	Joanna	83219321321	address	2020-11-06 15:32:39.316546-08
3	19	Joanna	83219321321	address	2020-11-06 15:39:13.211533-08
4	20	Joanna	83219321321	address	2020-11-06 15:39:47.977071-08
5	21	namename	321321321	123 street	2020-11-08 20:48:01.13726-08
6	22	name	3219032190321	8432091 street	2020-11-08 20:56:41.155018-08
7	23	namename	123123218942038421	123 street	2020-11-08 21:08:32.988972-08
8	26	name	fewafd	fdwafewa	2020-11-17 13:25:52.278682-08
9	26	namenamename	3213213	address	2020-11-17 13:26:26.717637-08
10	27	namename	123123123	shipping	2020-11-17 14:46:07.410162-08
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
2	CybertronPC	138465	/images/cybertronPC.jpg	Entertain your guests with the colors of your desktop or get W's in your favorite game	CybertronPC BLU-Print Desktop: Create 3-D models and render realistic images with this Cybertron PC BLU-Print professional design workstation. Two NVIDIA Quadro RTX 6000 graphics cards make short work of creative and design tasks, and the 128GB of RAM ensures resource-efficient multitasking. This Cybertron PC BLU-Print professional design workstation has an Intel Core i9 processor that provides a responsive user experience and a 960GB SSD and 6TB hard drive that provide plenty of storage space.
1	PlayStation 5	143500	/images/ps5.png	Explore uncharted virtual territories and slay dragons with this sleek Sony PlayStation 5 gaming console	The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games. Lightning Speed: Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do. Stunning Games: Marvel at incredible graphics and experience new PS5 features. Breathtaking Immersion: Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.
3	Nintendo Switch: Animal Crossing Edition	46000	/images/switch.jpg	Damn, Daniel! Don't forget to water your plants with this limited edition Animal Crossing Nintendo Switch	Explore a unique world with this Nintendo Switch Animal Crossing: New Horizons Edition console. The green and blue Joy-Con controllers offer precise control and work separately for versatile options, while the white dock lets you enjoy hours of immersive gaming. With a 6.2-inch touchscreen, this Nintendo Switch Animal Crossing: New Horizons Edition console provides clear graphics and responsive performance.
4	Xbox Series	35000	/images/xbox-series-s.jpg	You won't be able to order in a McD's drive thru but at least you can have a fun time playing your favorite games on this console	Introducing Xbox Series S. Experience the speed and performance of a next-gen all-digital console at an accessible price point. Seamlessly move between multiple games in a flash with Quick Resume. At the heart of Series S is the Xbox Velocity Architecture, which pairs a custom-SSD with integrated software for faster, streamlined gameplay with significantly reduced load times.*
5	Nintendo 64	25000	/images/nintendo-64.png	Bring back some childhood memories of smashing your friends with your favorite smash bro character or leave a trail of bananas for the tailgater	Released in 1996, the Nintendo 64 was the first system with 64-bit graphics and built-in four player gaming potential. Masterpieces such as Super Mario 64 and Super Smash Bros helped sell over 32 million N64 systems worldwide. The Nintendo 64 commonly called the N64 , is Nintendo's third home video game console for the international market. The system comes with everything that you need to get you started. System Includes One Controller, AC Adaptor, and AV Cables
6	Hyperx Cloud Gaming Headset	35000	/images/hyperx-headset.jpg	You kiss your mother with that mouth?! Talk smack to your enemies when they camp in a corner or let your team mates know how much you appreciate them	Upgrade your audio setup with this HyperX Cloud Orbit S gaming headset. Planar magnetic drivers deliver rich, detailed sound, and the Waves Nx head tracking and 3-D audio technologies deepen the immersion. This HyperX Cloud Orbit S gaming headset includes a detachable noise-canceling mic that blocks out background noise so teammates can hear you clearly.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 39, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 29, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 10, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

