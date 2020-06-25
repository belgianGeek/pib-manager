--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Raspbian 11.7-0+deb10u1)
-- Dumped by pg_dump version 11.7 (Raspbian 11.7-0+deb10u1)

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: barcodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.barcodes (
    id integer NOT NULL,
    barcode text
);


ALTER TABLE public.barcodes OWNER TO postgres;

--
-- Name: barcodes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.barcodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.barcodes_id_seq OWNER TO postgres;

--
-- Name: barcodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.barcodes_id_seq OWNED BY public.barcodes.id;


--
-- Name: drafts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drafts (
    id integer NOT NULL,
    reader_name text,
    request_date date,
    book_title text,
    comment text
);


ALTER TABLE public.drafts OWNER TO postgres;

--
-- Name: drafts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drafts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.drafts_id_seq OWNER TO postgres;

--
-- Name: drafts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.drafts_id_seq OWNED BY public.drafts.id;


--
-- Name: in_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.in_requests (
    pib_number integer,
    borrowing_library text,
    request_date date,
    loan_library text,
    reader_name text,
    book_title text,
    book_author_firstname text,
    book_author_name text,
    cdu text,
    out_province boolean,
    barcode text
);


ALTER TABLE public.in_requests OWNER TO postgres;

--
-- Name: out_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.out_requests (
    pib_number integer,
    borrowing_library text,
    request_date date,
    loan_library text,
    book_title text,
    book_author_firstname text,
    book_author_name text,
    cdu text,
    out_province boolean
);


ALTER TABLE public.out_requests OWNER TO postgres;

--
-- Name: readers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.readers (
    name text,
    email text,
    gender text
);


ALTER TABLE public.readers OWNER TO postgres;

--
-- Name: barcodes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barcodes ALTER COLUMN id SET DEFAULT nextval('public.barcodes_id_seq'::regclass);


--
-- Name: drafts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drafts ALTER COLUMN id SET DEFAULT nextval('public.drafts_id_seq'::regclass);


--
-- Data for Name: barcodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.barcodes (id, barcode) FROM stdin;
3	13609100000031
4	1360910000004X
5	13609100000058
6	13609100000066
7	13609100000074
8	13609100000082
9	13609100000090
10	13609100000104
11	13609100000112
12	13609100000120
13	13609100000139
14	13609100000147
15	13609100000228
16	13609100000236
17	13609100000244
18	13609100000252
19	13609100000260
20	13609100000279
21	13609100000287
22	13609100000295
23	13609100000309
24	13609100000317
25	13609100000325
26	13609100000333
27	13609100000155
28	13609100000163
29	13609100000171
30	1360910000018X
31	13609100000198
32	13609100000201
33	1360910000021X
34	13609100000341
35	1360910000035X
36	13609100000368
37	13609100000376
38	13609100000384
39	13609100000392
40	13609100000406
41	13609100000414
42	13609100000422
43	13609100000430
44	13609100000449
45	13609100000457
46	1360910000052X
47	13609100000538
48	13609100000546
49	13609100000570
50	13609100000554
51	13609100000562
52	13609100000465
53	13609100000473
54	13609100000481
55	1360910000049X
56	13609100000503
57	13609100000511
58	13609100000821
59	1360910000083X
60	13609100000848
61	13609100000856
62	13609100000864
63	13609100000872
64	13609100000880
65	13609100000899
66	13609100000902
67	13609100000910
68	13609100000929
69	13609100000937
70	13609100000643
71	13609100000651
72	1360910000066X
73	13609100000678
74	13609100000686
75	13609100000694
\.


--
-- Data for Name: drafts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.drafts (id, reader_name, request_date, book_title, comment) FROM stdin;
1	Vanderwegen, Maxime	2020-06-24	Naufrage	auteur : Bordes, Gilbert
\.


--
-- Data for Name: in_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.in_requests (pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_firstname, book_author_name, cdu, out_province, barcode) FROM stdin;
246601	Fléron	2020-06-24	Perwez	Vanderwegen, Maxime	Naufrage	Gilbert	BORDES	8-3	t	13609100000015
245603	Jodoigne	2020-06-24	Perwez	Vanderwegen, Maxime	Victime 2117	Jussi	ADLER-OLSEN	8-3	t	13609100000023
\.


--
-- Data for Name: out_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.out_requests (pib_number, borrowing_library, request_date, loan_library, book_title, book_author_firstname, book_author_name, cdu, out_province) FROM stdin;
245601	Liège	2020-06-24	Perwez	Le fléau	Stephen	KING	8-3	f
\.


--
-- Data for Name: readers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.readers (name, email, gender) FROM stdin;
\.


--
-- Name: barcodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.barcodes_id_seq', 75, true);


--
-- Name: drafts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.drafts_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

